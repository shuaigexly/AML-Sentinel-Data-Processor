from __future__ import annotations

import argparse
import json
import random
from collections import defaultdict
from pathlib import Path
from typing import Any


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert sampled DGraph-Fin records into amlAlerts.ts and amlCases.ts",
    )
    parser.add_argument("--root", default="data/dgraphfin", help="Local DGraphFin root directory")
    parser.add_argument("--sample-fraud", type=int, default=200, help="Fraud sample size")
    parser.add_argument("--sample-normal", type=int, default=300, help="Normal sample size")
    parser.add_argument("--seed", type=int, default=7, help="Random seed")
    parser.add_argument(
        "--output-dir",
        default="src/lib",
        help="Directory where amlAlerts.ts and amlCases.ts will be written",
    )
    return parser.parse_args()


def require_dgraphfin(root: str) -> tuple[Any, Any]:
    try:
        from torch_geometric.datasets import DGraphFin
    except ImportError as exc:
        raise SystemExit(
            "torch-geometric is required for preprocess_cases.py. Install it first, then rerun this script."
        ) from exc

    dataset = DGraphFin(root=root)
    return dataset, dataset[0]


def rescale(value: float, lower: float, upper: float) -> float:
    clipped = max(0.0, min(1.0, value))
    return lower + clipped * (upper - lower)


def choose_transaction_type(amount: int, rng: random.Random) -> str:
    if amount >= 2_000_000:
        return "transfer"
    if amount >= 50_000:
        return rng.choices(["cash", "transfer", "remittance"], weights=[0.35, 0.45, 0.2])[0]
    if amount >= 20_000:
        return rng.choices(["cash", "remittance", "transfer"], weights=[0.45, 0.35, 0.2])[0]
    return rng.choices(["pos", "cash", "transfer"], weights=[0.55, 0.25, 0.2])[0]


def assign_rules(amount: int, tx_type: str, is_high_risk_country: bool, historical_frequency: int) -> list[str]:
    rules: list[str] = []

    if amount >= 50_000 and tx_type == "cash":
        rules.append("PBOC_LARGE_CASH")
    if amount >= 2_000_000 and tx_type == "transfer":
        rules.append("PBOC_LARGE_TRANSFER")
    if is_high_risk_country:
        rules.append("HIGH_RISK_COUNTRY")
    if 40_000 <= amount <= 49_999:
        rules.append("SMURFING")
    if historical_frequency > 15:
        rules.append("FREQUENT_CASH")
    if tx_type in {"transfer", "remittance"} and amount >= 80_000 and historical_frequency >= 6:
        rules.append("RAPID_MOVEMENT")

    return sorted(set(rules))


def compute_risk_score(fraud_label: bool, triggered_rules: list[str], historical_frequency: int) -> int:
    base_score = 50 if fraud_label else 0
    rule_score = len(triggered_rules) * 12
    freq_score = min(historical_frequency / 50 * 20, 20)
    return min(int(round(base_score + rule_score + freq_score)), 100)


def derive_severity(risk_score: int) -> str:
    if risk_score >= 80:
        return "critical"
    if risk_score >= 60:
        return "high"
    if risk_score >= 31:
        return "medium"
    return "low"


def derive_case_status(risk_score: int, fraud_label: bool) -> str:
    if not fraud_label and risk_score < 20:
        return "closed_false_positive"
    if risk_score >= 85:
        return "ready_for_reporting"
    if risk_score >= 70:
        return "ready_for_supervisor_review"
    if risk_score >= 45:
        return "under_review"
    if risk_score >= 25:
        return "need_more_evidence"
    return "new_alert"


def derive_urgency(status: str) -> tuple[str, str | None]:
    if status == "ready_for_reporting":
        return "immediate", "2024-12-31"
    if status == "ready_for_supervisor_review":
        return "priority", "2024-12-31"
    return "normal", None


def build_alert_rows(data: Any, sample_fraud: int, sample_normal: int, seed: int) -> list[dict[str, Any]]:
    rng = random.Random(seed)
    labels = data.y.tolist()
    feature_rows = data.x.tolist()
    candidate_fraud = [index for index, label in enumerate(labels) if label == 1]
    candidate_normal = [index for index, label in enumerate(labels) if label == 0]

    sample_indexes = rng.sample(candidate_fraud, min(sample_fraud, len(candidate_fraud)))
    sample_indexes += rng.sample(candidate_normal, min(sample_normal, len(candidate_normal)))
    rng.shuffle(sample_indexes)

    alerts: list[dict[str, Any]] = []
    shared_accounts = [f"ACC-{index:04d}" for index in range(1, 101)]

    for order, index in enumerate(sample_indexes, start=1):
        features = feature_rows[index]
        amount = int(round(rescale(abs(float(features[1])) % 1, 10_000, 3_200_000)))
        historical_frequency = int(round(rescale(abs(float(features[0])) % 1, 0, 20)))
        is_high_risk_country = float(features[2]) > 0.5 if len(features) > 2 else False
        tx_type = choose_transaction_type(amount, rng)
        triggered_rules = assign_rules(amount, tx_type, is_high_risk_country, historical_frequency)
        fraud_label = labels[index] == 1
        risk_score = compute_risk_score(fraud_label, triggered_rules, historical_frequency)
        severity = derive_severity(risk_score)

        sender_account = rng.choice(shared_accounts)
        receiver_account = sender_account if order % 5 == 0 else rng.choice(shared_accounts)

        alerts.append(
            {
                "id": f"ALT-{order:04d}",
                "caseId": "",
                "transactionId": f"TXN-{order:05d}",
                "date": f"2024-11-{(order % 27) + 1:02d}",
                "amount": amount,
                "transactionType": tx_type,
                "senderAccountId": sender_account,
                "receiverAccountId": receiver_account,
                "senderType": "corporate" if order % 4 == 0 else "individual",
                "receiverType": "corporate" if order % 3 == 0 else "individual",
                "isHighRiskCountry": is_high_risk_country,
                "historicalFrequency": historical_frequency,
                "riskScore": risk_score,
                "severity": severity,
                "triggeredRules": triggered_rules,
                "fraudLabel": fraud_label,
                "typology": rng.choice(["fan-out", "fan-in", "cycle", "rapid-movement", "layering"]),
                "createdAt": f"2024-11-{(order % 27) + 1:02d}T09:00:00Z",
            }
        )

    return alerts


def cluster_cases(alerts: list[dict[str, Any]]) -> list[dict[str, Any]]:
    adjacency: dict[str, set[str]] = defaultdict(set)
    alert_by_account: dict[str, list[str]] = defaultdict(list)

    for alert in alerts:
        sender = alert["senderAccountId"]
        receiver = alert["receiverAccountId"]
        adjacency[sender].add(receiver)
        adjacency[receiver].add(sender)
        alert_by_account[sender].append(alert["id"])
        alert_by_account[receiver].append(alert["id"])

    visited: set[str] = set()
    cases: list[dict[str, Any]] = []
    case_number = 1

    for account_id in alert_by_account:
        if account_id in visited:
            continue

        stack = [account_id]
        component_accounts: set[str] = set()
        component_alert_ids: set[str] = set()

        while stack:
            current = stack.pop()
            if current in visited:
                continue
            visited.add(current)
            component_accounts.add(current)
            component_alert_ids.update(alert_by_account[current])
            stack.extend(adjacency[current] - visited)

        case_alerts = [alert for alert in alerts if alert["id"] in component_alert_ids]
        if not case_alerts:
            continue

        case_alerts.sort(key=lambda item: item["riskScore"], reverse=True)
        primary = case_alerts[0]
        status = derive_case_status(primary["riskScore"], bool(primary["fraudLabel"]))
        urgency, deadline = derive_urgency(status)
        case_id = f"CASE-{case_number:04d}"
        case_number += 1

        for alert in case_alerts:
            alert["caseId"] = case_id

        cases.append(
            {
                "id": case_id,
                "alertIds": [alert["id"] for alert in case_alerts],
                "status": status,
                "subjectAccountId": primary["senderAccountId"],
                "subjectType": primary["senderType"],
                "summary": f"Clustered AML case built from {len(case_alerts)} linked alerts around {primary['senderAccountId']}.",
                "keyFindings": [
                    f"Primary alert {primary['id']} carries risk score {primary['riskScore']}/100.",
                    f"The case spans {len(component_accounts)} connected accounts.",
                    f"Triggered rules across the case: {', '.join(sorted({rule for alert in case_alerts for rule in alert['triggeredRules']})) or 'none'}.",
                ],
                "suggestedTypologies": sorted(
                    {
                        str(alert.get("typology", "")).replace("-", "_")
                        for alert in case_alerts
                        if alert.get("typology")
                    }
                ),
                "reportingUrgency": urgency,
                "reportingDeadline": deadline,
                "analystNotes": "Generated offline from DGraph-Fin sampling; review before demo use.",
                "lastUpdated": primary["createdAt"],
            }
        )

    return cases


def to_ts_module(type_block: str, export_signature: str, payload: Any) -> str:
    return f"{type_block}\n\nexport const {export_signature} = {json.dumps(payload, indent=2, ensure_ascii=False)};\n"


def write_outputs(output_dir: Path, alerts: list[dict[str, Any]], cases: list[dict[str, Any]]) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)

    alert_types = "\n".join(
        [
            "export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';",
            "export type TransactionType = 'transfer' | 'cash' | 'remittance' | 'pos';",
            "export type PartyType = 'individual' | 'corporate';",
            "",
            "export type PbocRule =",
            "  | 'PBOC_LARGE_CASH'",
            "  | 'PBOC_LARGE_TRANSFER'",
            "  | 'HIGH_RISK_COUNTRY'",
            "  | 'SMURFING'",
            "  | 'RAPID_MOVEMENT'",
            "  | 'FREQUENT_CASH';",
            "",
            "export interface AmlAlert {",
            "  id: string;",
            "  caseId: string;",
            "  transactionId: string;",
            "  date: string;",
            "  amount: number;",
            "  transactionType: TransactionType;",
            "  senderAccountId: string;",
            "  receiverAccountId: string;",
            "  senderType: PartyType;",
            "  receiverType: PartyType;",
            "  isHighRiskCountry: boolean;",
            "  historicalFrequency: number;",
            "  riskScore: number;",
            "  severity: AlertSeverity;",
            "  triggeredRules: PbocRule[];",
            "  fraudLabel: boolean;",
            "  typology?: string;",
            "  createdAt: string;",
            "}",
        ]
    )

    case_types = "\n".join(
        [
            "export type CaseStatus =",
            "  | 'new_alert'",
            "  | 'under_review'",
            "  | 'need_more_evidence'",
            "  | 'ready_for_supervisor_review'",
            "  | 'closed_false_positive'",
            "  | 'ready_for_reporting';",
            "",
            "export interface AmlCase {",
            "  id: string;",
            "  alertIds: string[];",
            "  status: CaseStatus;",
            "  subjectAccountId: string;",
            "  subjectType: 'individual' | 'corporate';",
            "  summary: string;",
            "  keyFindings: string[];",
            "  suggestedTypologies: string[];",
            "  reportingUrgency: 'normal' | 'priority' | 'immediate';",
            "  reportingDeadline?: string;",
            "  analystNotes: string;",
            "  lastUpdated: string;",
            "}",
        ]
    )

    (output_dir / "amlAlerts.ts").write_text(
        to_ts_module(alert_types, "amlAlerts: AmlAlert[]", alerts),
        encoding="utf-8",
    )
    (output_dir / "amlCases.ts").write_text(
        to_ts_module(case_types, "amlCases: AmlCase[]", cases),
        encoding="utf-8",
    )


def main() -> None:
    args = parse_args()
    _, data = require_dgraphfin(args.root)
    alerts = build_alert_rows(data, args.sample_fraud, args.sample_normal, args.seed)
    cases = cluster_cases(alerts)
    write_outputs(Path(args.output_dir), alerts, cases)
    print(f"Wrote {len(alerts)} alerts and {len(cases)} cases to {args.output_dir}")


if __name__ == "__main__":
    main()
