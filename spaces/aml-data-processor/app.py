"""
AML Data Processor — HuggingFace Space
Loads IBM AML HI-Small from HuggingFace, generates three TypeScript files,
then commits them directly to the portfolio GitHub repo via API.

Outputs committed to repo:
  src/lib/amlAlerts.ts
  src/lib/amlCases.ts
  src/lib/amlNetworkData.ts
"""
from __future__ import annotations

import base64
import json
import math
import random
import urllib.request
import urllib.error
from collections import defaultdict
from typing import Any

import gradio as gr
import pandas as pd

# ---------------------------------------------------------------------------
# Color constants (teal monochrome)
# ---------------------------------------------------------------------------
COLOR_FRAUD      = "#134e4a"   # primary-800
COLOR_SUSPICIOUS = "#0d9488"   # primary-500
COLOR_NORMAL     = "#99f6e4"   # primary-200
EDGE_HOT         = "#0f766e"   # primary-600
EDGE_COLD        = "#ccfbf1"   # primary-100

BRANCH = "main"

# ---------------------------------------------------------------------------
# IBM AML column helpers
# ---------------------------------------------------------------------------
PAYMENT_FORMAT_MAP: dict[str, str] = {
    "cash": "cash",
    "wire": "transfer",
    "cheque": "transfer",
    "credit card": "pos",
    "debit card": "pos",
    "ach": "transfer",
    "reinvestment": "remittance",
    "bitcoin": "transfer",
}


def map_payment_format(raw: str) -> str:
    return PAYMENT_FORMAT_MAP.get(str(raw).strip().lower(), "transfer")


def find_col(df: pd.DataFrame, *candidates: str) -> str | None:
    lower_map = {c.lower(): c for c in df.columns}
    for c in candidates:
        if c in df.columns:
            return c
        if c.lower() in lower_map:
            return lower_map[c.lower()]
    return None


def get_amount(row: Any, df: pd.DataFrame) -> float:
    col = find_col(df, "Amount Paid", "Amount Received", "Amount")
    if col:
        try:
            return float(row[col])
        except (ValueError, TypeError):
            pass
    return 0.0


def get_account(row: Any, df: pd.DataFrame, side: str) -> str:
    col = find_col(df, "Account", "From Account") if side == "from" else find_col(df, "Account.1", "To Account")
    return str(row[col]).strip() if col else "UNKNOWN"


def get_laundering(row: Any, df: pd.DataFrame) -> bool:
    col = find_col(df, "Is Laundering", "is_laundering", "Label")
    return str(row[col]).strip() in {"1", "1.0", "true", "True", "TRUE"} if col else False


def get_payment_format(row: Any, df: pd.DataFrame) -> str:
    col = find_col(df, "Payment Format", "Payment_Format", "payment_format")
    return map_payment_format(str(row[col])) if col else "transfer"


def scale_to_rmb(amount: float) -> int:
    return max(1_000, min(int(round(amount * 7.0)), 5_000_000))


# ---------------------------------------------------------------------------
# Risk scoring
# ---------------------------------------------------------------------------
def assign_rules(amount: float, tx_type: str, is_high_risk: bool, freq: int) -> list[str]:
    rules: list[str] = []
    if amount >= 50_000 and tx_type == "cash":
        rules.append("PBOC_LARGE_CASH")
    if amount >= 2_000_000 and tx_type == "transfer":
        rules.append("PBOC_LARGE_TRANSFER")
    if is_high_risk:
        rules.append("HIGH_RISK_COUNTRY")
    if 40_000 <= amount <= 49_999:
        rules.append("SMURFING")
    if freq > 15:
        rules.append("FREQUENT_CASH")
    if tx_type in {"transfer", "remittance"} and amount >= 80_000 and freq >= 6:
        rules.append("RAPID_MOVEMENT")
    return sorted(set(rules))


def compute_risk_score(fraud: bool, rules: list[str], freq: int) -> int:
    return min(int(round((50 if fraud else 0) + len(rules) * 12 + min(freq / 50 * 20, 20))), 100)


def derive_severity(score: int) -> str:
    if score >= 80: return "critical"
    if score >= 60: return "high"
    if score >= 31: return "medium"
    return "low"


def derive_case_status(score: int, fraud: bool) -> str:
    if not fraud and score < 20: return "closed_false_positive"
    if score >= 85: return "ready_for_reporting"
    if score >= 70: return "ready_for_supervisor_review"
    if score >= 45: return "under_review"
    if score >= 25: return "need_more_evidence"
    return "new_alert"


def derive_urgency(status: str) -> tuple[str, str | None]:
    if status == "ready_for_reporting":    return "immediate", "2024-12-31"
    if status == "ready_for_supervisor_review": return "priority", "2024-12-31"
    return "normal", None


# ---------------------------------------------------------------------------
# Alerts + cases
# ---------------------------------------------------------------------------
def build_alerts_and_cases(df: pd.DataFrame, sample_size: int, seed: int) -> tuple[list[dict], list[dict]]:
    rng = random.Random(seed)
    sender_col = find_col(df, "Account", "From Account") or ""
    freq_map: dict[str, int] = defaultdict(int)
    if sender_col:
        for val in df[sender_col]:
            freq_map[str(val).strip()] += 1

    fraud_rows   = df[df.apply(lambda r: get_laundering(r, df), axis=1)]
    normal_rows  = df[~df.apply(lambda r: get_laundering(r, df), axis=1)]
    n_fraud  = min(200, len(fraud_rows))
    n_normal = min(sample_size - n_fraud, len(normal_rows))

    sampled = pd.concat([
        fraud_rows.sample(n=n_fraud, random_state=seed),
        normal_rows.sample(n=n_normal, random_state=seed),
    ]).sample(frac=1, random_state=seed).reset_index(drop=True)

    alerts: list[dict] = []
    account_counter: dict[str, int] = {}

    def anon(raw: str) -> str:
        if raw not in account_counter:
            account_counter[raw] = len(account_counter) + 1
        return f"ACC-{account_counter[raw]:04d}"

    for order, (_, row) in enumerate(sampled.iterrows(), start=1):
        amount   = scale_to_rmb(get_amount(row, df))
        tx_type  = get_payment_format(row, df)
        fraud    = get_laundering(row, df)
        sender   = anon(get_account(row, df, "from"))
        receiver = anon(get_account(row, df, "to"))
        freq     = min(freq_map.get(get_account(row, df, "from"), 1), 50)
        is_high_risk = rng.random() < (0.30 if fraud else 0.05)
        rules    = assign_rules(amount, tx_type, is_high_risk, freq)
        score    = compute_risk_score(fraud, rules, freq)
        day      = (order % 27) + 1
        alerts.append({
            "id": f"ALT-{order:04d}", "caseId": "",
            "transactionId": f"TXN-{order:05d}",
            "date": f"2024-11-{day:02d}", "amount": amount,
            "transactionType": tx_type,
            "senderAccountId": sender, "receiverAccountId": receiver,
            "senderType": "corporate" if order % 4 == 0 else "individual",
            "receiverType": "corporate" if order % 3 == 0 else "individual",
            "isHighRiskCountry": is_high_risk,
            "historicalFrequency": freq,
            "riskScore": score, "severity": derive_severity(score),
            "triggeredRules": rules, "fraudLabel": fraud,
            "typology": None, "createdAt": f"2024-11-{day:02d}T09:00:00Z",
        })

    cases = _cluster_cases(alerts)
    return alerts, cases


def _cluster_cases(alerts: list[dict]) -> list[dict]:
    adjacency: dict[str, set[str]] = defaultdict(set)
    alert_by_acc: dict[str, list[str]] = defaultdict(list)
    for a in alerts:
        s, r = a["senderAccountId"], a["receiverAccountId"]
        adjacency[s].add(r); adjacency[r].add(s)
        alert_by_acc[s].append(a["id"]); alert_by_acc[r].append(a["id"])

    visited: set[str] = set()
    cases: list[dict] = []
    case_number = 1

    for acc in list(alert_by_acc):
        if acc in visited: continue
        stack, component_accs, component_ids = [acc], set(), set()
        while stack:
            cur = stack.pop()
            if cur in visited: continue
            visited.add(cur); component_accs.add(cur)
            component_ids.update(alert_by_acc[cur])
            stack.extend(adjacency[cur] - visited)

        case_alerts = sorted(
            [a for a in alerts if a["id"] in component_ids],
            key=lambda a: a["riskScore"], reverse=True,
        )
        if not case_alerts: continue
        primary = case_alerts[0]
        status = derive_case_status(primary["riskScore"], bool(primary["fraudLabel"]))
        urgency, deadline = derive_urgency(status)
        case_id = f"CASE-{case_number:04d}"; case_number += 1
        for a in case_alerts: a["caseId"] = case_id
        all_rules = sorted({r for a in case_alerts for r in a["triggeredRules"]})
        cases.append({
            "id": case_id, "alertIds": [a["id"] for a in case_alerts],
            "status": status,
            "subjectAccountId": primary["senderAccountId"],
            "subjectType": primary["senderType"],
            "summary": f"Clustered case from {len(case_alerts)} linked alerts around {primary['senderAccountId']}.",
            "keyFindings": [
                f"Primary alert {primary['id']} carries risk score {primary['riskScore']}/100.",
                f"Case spans {len(component_accs)} connected accounts.",
                f"Triggered rules: {', '.join(all_rules) or 'none'}.",
            ],
            "suggestedTypologies": sorted({
                str(a.get("typology", "")).replace("-", "_")
                for a in case_alerts if a.get("typology")
            }),
            "reportingUrgency": urgency,
            "reportingDeadline": deadline,
            "analystNotes": "Generated from IBM AML HI-Small via HuggingFace Space.",
            "lastUpdated": primary["createdAt"],
        })
    return cases


# ---------------------------------------------------------------------------
# Network graph
# ---------------------------------------------------------------------------
def build_network(df: pd.DataFrame, limit: int = 50, normal_count: int = 20) -> dict:
    l_edges: list[dict] = []
    n_edges: list[dict] = []

    sender_col   = find_col(df, "Account", "From Account")
    receiver_col = find_col(df, "Account.1", "To Account")
    amount_col   = find_col(df, "Amount Paid", "Amount Received", "Amount")

    for _, row in df.iterrows():
        src = str(row[sender_col]).strip()   if sender_col   else "?"
        tgt = str(row[receiver_col]).strip() if receiver_col else "?"
        if not src or not tgt or src == tgt: continue
        amt = scale_to_rmb(float(row[amount_col])) if amount_col else 1000
        edge = {"source": src, "target": tgt, "amount": amt}
        (l_edges if get_laundering(row, df) else n_edges).append(edge)

    in_deg: dict[str, int]  = defaultdict(int)
    out_deg: dict[str, int] = defaultdict(int)
    for e in l_edges:
        out_deg[e["source"]] += 1; in_deg[e["target"]] += 1

    fan_out = {n for n, d in out_deg.items() if d > 3}
    fan_in  = {n for n, d in in_deg.items()  if d > 3}

    adj: dict[str, set[str]] = defaultdict(set)
    for e in l_edges: adj[e["source"]].add(e["target"])
    cycle_nodes: set[str] = set()
    for s, nbrs in adj.items():
        for m in nbrs:
            for end in adj.get(m, set()):
                if s in adj.get(end, set()):
                    cycle_nodes.update({s, m, end})

    selected: dict[str, dict] = {}
    sel_edges: list[dict] = []

    def upsert(node_id: str, cat: int, typology: str | None, amt: int) -> None:
        color = COLOR_FRAUD if cat == 2 else COLOR_SUSPICIOUS if cat == 1 else COLOR_NORMAL
        risk  = 90 if cat == 2 else 62 if cat == 1 else 15
        ex = selected.get(node_id)
        payload = {"id": node_id, "name": node_id, "value": max(amt, 1),
                   "category": cat, "riskScore": risk, "typology": typology,
                   "itemStyle": {"color": color}}
        if ex:
            cat = max(ex["category"], cat)
            payload.update({"value": max(ex["value"], amt),
                            "riskScore": max(ex["riskScore"], risk),
                            "category": cat,
                            "typology": ex.get("typology") or typology,
                            "itemStyle": {"color": COLOR_FRAUD if cat == 2 else COLOR_SUSPICIOUS if cat == 1 else COLOR_NORMAL}})
        selected[node_id] = payload

    for e in l_edges:
        t = "fan-out" if e["source"] in fan_out else "fan-in" if e["target"] in fan_in \
            else "cycle" if e["source"] in cycle_nodes or e["target"] in cycle_nodes else None
        upsert(e["source"], 2, t, e["amount"])
        upsert(e["target"], 1, t, e["amount"])
        sel_edges.append({"source": e["source"], "target": e["target"], "value": e["amount"],
                          "lineStyle": {"width": max(1, min(5, int(round(math.log10(max(e["amount"], 10)))))),
                                        "color": EDGE_HOT}})
        if len(selected) >= max(limit - normal_count, 1): break

    for e in n_edges:
        if len([n for n in selected.values() if n["category"] == 0]) >= normal_count: break
        upsert(e["source"], 0, None, e["amount"])
        upsert(e["target"], 0, None, e["amount"])
        sel_edges.append({"source": e["source"], "target": e["target"], "value": e["amount"],
                          "lineStyle": {"width": 1, "color": EDGE_COLD}})

    nodes    = list(selected.values())[:limit]
    node_ids = {n["id"] for n in nodes}
    return {
        "categories": [{"name": "Normal"}, {"name": "Suspicious"}, {"name": "Confirmed Fraud"}],
        "nodes": nodes,
        "edges": [e for e in sel_edges if e["source"] in node_ids and e["target"] in node_ids],
    }


# ---------------------------------------------------------------------------
# TypeScript serialisers
# ---------------------------------------------------------------------------
ALERT_TYPES = """\
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type TransactionType = 'transfer' | 'cash' | 'remittance' | 'pos';
export type PartyType = 'individual' | 'corporate';

export type PbocRule =
  | 'PBOC_LARGE_CASH'
  | 'PBOC_LARGE_TRANSFER'
  | 'HIGH_RISK_COUNTRY'
  | 'SMURFING'
  | 'RAPID_MOVEMENT'
  | 'FREQUENT_CASH';

export interface AmlAlert {
  id: string;
  caseId: string;
  transactionId: string;
  date: string;
  amount: number;
  transactionType: TransactionType;
  senderAccountId: string;
  receiverAccountId: string;
  senderType: PartyType;
  receiverType: PartyType;
  isHighRiskCountry: boolean;
  historicalFrequency: number;
  riskScore: number;
  severity: AlertSeverity;
  triggeredRules: PbocRule[];
  fraudLabel: boolean;
  typology?: string;
  createdAt: string;
}"""

CASE_TYPES = """\
export type CaseStatus =
  | 'new_alert'
  | 'under_review'
  | 'need_more_evidence'
  | 'ready_for_supervisor_review'
  | 'closed_false_positive'
  | 'ready_for_reporting';

export interface AmlCase {
  id: string;
  alertIds: string[];
  status: CaseStatus;
  subjectAccountId: string;
  subjectType: 'individual' | 'corporate';
  summary: string;
  keyFindings: string[];
  suggestedTypologies: string[];
  reportingUrgency: 'normal' | 'priority' | 'immediate';
  reportingDeadline?: string;
  analystNotes: string;
  lastUpdated: string;
}"""

NETWORK_TYPES = """\
export interface NetworkNode {
  id: string;
  name: string;
  value: number;
  category: number;
  riskScore: number;
  typology?: string;
  itemStyle: { color: string };
}

export interface NetworkEdge {
  source: string;
  target: string;
  value: number;
  lineStyle: { width: number; color: string };
}

export interface AmlNetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  categories: Array<{ name: string }>;
}"""


def to_ts(type_block: str, export_name: str, payload: Any) -> str:
    return f"{type_block}\n\nexport const {export_name} = {json.dumps(payload, indent=2, ensure_ascii=False)};\n"


# ---------------------------------------------------------------------------
# GitHub commit helper
# ---------------------------------------------------------------------------
def github_commit_file(token: str, repo_owner: str, repo_name: str, branch: str,
                       path: str, content: str, message: str) -> str:
    """Create or update a file in a GitHub repo via REST API. Returns status string."""
    api_base = f"https://api.github.com/repos/{repo_owner}/{repo_name}/contents/{path}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
    }

    # Check if file exists to get its SHA
    sha: str | None = None
    try:
        req = urllib.request.Request(
            f"{api_base}?ref={branch}", headers=headers, method="GET"
        )
        with urllib.request.urlopen(req) as resp:
            existing = json.loads(resp.read())
            sha = existing.get("sha")
    except urllib.error.HTTPError as e:
        if e.code != 404:
            return f"GET {path} failed: {e.code} {e.reason}"

    body: dict[str, Any] = {
        "message": message,
        "content": base64.b64encode(content.encode("utf-8")).decode("ascii"),
        "branch": branch,
    }
    if sha:
        body["sha"] = sha

    try:
        req = urllib.request.Request(
            api_base,
            data=json.dumps(body).encode("utf-8"),
            headers=headers,
            method="PUT",
        )
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
            return result.get("commit", {}).get("html_url", "committed")
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8", errors="replace")
        return f"PUT {path} failed: {e.code} {e.reason} — {error_body[:200]}"


# ---------------------------------------------------------------------------
# Main Gradio handler
# ---------------------------------------------------------------------------
def process(
    github_token: str,
    repo_owner: str,
    repo_name: str,
    sample_size: int,
    seed: int,
    progress: gr.Progress = gr.Progress(),
) -> str:
    github_token = github_token.strip()
    repo_owner   = repo_owner.strip()
    repo_name    = repo_name.strip()
    if not github_token:
        return "GitHub token is required."
    if not repo_owner or not repo_name:
        return "GitHub owner and repo name are required."

    progress(0.0, desc="Loading IBM AML dataset from HuggingFace...")
    try:
        from datasets import load_dataset
        ds = load_dataset(
            "eexzzm/IBM-Transactions-for-Anti-Money-Laundering-HI-Small-Trans",
            split="train",
        )
        df = ds.to_pandas()
    except Exception as exc:
        return f"Failed to load dataset: {exc}"

    progress(0.3, desc=f"Loaded {len(df):,} rows — building alerts and cases...")
    alerts, cases = build_alerts_and_cases(df, sample_size=int(sample_size), seed=int(seed))

    progress(0.6, desc="Building network graph...")
    network = build_network(df)

    progress(0.75, desc="Serialising TypeScript...")
    alerts_ts  = to_ts(ALERT_TYPES,   "amlAlerts: AmlAlert[]",         alerts)
    cases_ts   = to_ts(CASE_TYPES,    "amlCases: AmlCase[]",           cases)
    network_ts = to_ts(NETWORK_TYPES, "amlNetworkData: AmlNetworkData", network)

    commit_msg = f"data: replace mock AML data with IBM AML HI-Small (seed={seed}, n={len(alerts)})"

    files = [
        ("src/lib/amlAlerts.ts",      alerts_ts),
        ("src/lib/amlCases.ts",       cases_ts),
        ("src/lib/amlNetworkData.ts", network_ts),
    ]

    lines = [
        f"Processed {len(alerts)} alerts ({sum(1 for a in alerts if a['fraudLabel'])} fraud), "
        f"{len(cases)} cases, {len(network['nodes'])} network nodes.\n",
        "Committing to GitHub...\n",
    ]

    for i, (path, content) in enumerate(files):
        progress(0.8 + i * 0.06, desc=f"Committing {path}...")
        result = github_commit_file(
            token=github_token,
            repo_owner=repo_owner,
            repo_name=repo_name,
            branch=BRANCH,
            path=path,
            content=content,
            message=commit_msg,
        )
        lines.append(f"  {path}: {result}")

    lines.append(
        "\nAll 3 files committed. Vercel will auto-redeploy if connected to the repo."
    )
    progress(1.0, desc="Done.")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# UI
# ---------------------------------------------------------------------------
with gr.Blocks(title="AML Data Processor") as demo:
    gr.Markdown(
        "## AML Sentinel — Data Processor\n"
        "Loads IBM AML HI-Small from HuggingFace, generates TypeScript data files, "
        "and commits them directly to your GitHub repo.\n\n"
        "**Data source**: `eexzzm/IBM-Transactions-for-Anti-Money-Laundering-HI-Small-Trans` (public)\n"
        "**Target repo**: `shuaigexly/AML-Sentinel-Data-Processor` — branch `main`"
    )

    github_token_input = gr.Textbox(
        label="GitHub Token (repo write scope)",
        placeholder="ghp_...",
        type="password",
        info="github.com/settings/tokens — Fine-grained, Contents: Read & Write on target repo only",
    )

    with gr.Row():
        repo_owner_input = gr.Textbox(
            label="GitHub username",
            value="shuaigexly",
            info="Your GitHub username",
        )
        repo_name_input = gr.Textbox(
            label="Repo name",
            value="AML-Sentinel-Data-Processor",
            info="Exact repo name as it appears on GitHub",
        )

    with gr.Row():
        sample_input = gr.Slider(100, 500, value=500, step=50, label="Alert sample size")
        seed_input   = gr.Number(value=42, label="Random seed", precision=0)

    run_btn = gr.Button("Generate and commit to GitHub", variant="primary")
    output  = gr.Textbox(label="Result", lines=12, interactive=False)

    run_btn.click(
        fn=process,
        inputs=[github_token_input, repo_owner_input, repo_name_input, sample_input, seed_input],
        outputs=[output],
    )

if __name__ == "__main__":
    demo.launch()
