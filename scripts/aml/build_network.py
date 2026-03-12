from __future__ import annotations

import argparse
import csv
import json
import math
from collections import defaultdict
from pathlib import Path
from typing import Any


PRIMARY_800 = "#134e4a"
PRIMARY_500 = "#0d9488"
PRIMARY_200 = "#99f6e4"
PRIMARY_600 = "#0f766e"
PRIMARY_100 = "#ccfbf1"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build amlNetworkData.ts from IBM AML HI-Small style CSV input",
    )
    parser.add_argument("--input", required=True, help="Path to IBM AML CSV")
    parser.add_argument("--output", default="src/lib/amlNetworkData.ts", help="Output TypeScript file")
    parser.add_argument("--limit", type=int, default=50, help="Target node count")
    parser.add_argument("--normal-count", type=int, default=20, help="Normal node quota")
    return parser.parse_args()


def read_rows(csv_path: Path) -> list[dict[str, str]]:
    with csv_path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        return list(reader)


def pick_first(row: dict[str, str], *candidates: str, default: str = "") -> str:
    lowered = {key.lower(): value for key, value in row.items()}
    for candidate in candidates:
        if candidate in row and row[candidate]:
            return row[candidate]
        lowered_value = lowered.get(candidate.lower())
        if lowered_value:
            return lowered_value
    return default


def amount_from_row(row: dict[str, str]) -> float:
    raw = pick_first(row, "Amount Paid", "Amount Received", "Amount", default="0")
    try:
        return float(raw)
    except ValueError:
        return 0.0


def build_graph(rows: list[dict[str, str]]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    laundering_edges: list[dict[str, Any]] = []
    normal_edges: list[dict[str, Any]] = []

    for row in rows:
        source = pick_first(row, "From Account", "Source Account", "Sender", default="").strip()
        target = pick_first(row, "To Account", "Target Account", "Receiver", default="").strip()
        if not source or not target:
            continue

        edge = {
            "source": source,
            "target": target,
            "amount": amount_from_row(row),
            "typology": pick_first(row, "Laundering Type", "Type", default="").strip().lower(),
        }
        laundering_flag = pick_first(row, "Is Laundering", default="0").strip()
        if laundering_flag in {"1", "true", "True", "TRUE"}:
            laundering_edges.append(edge)
        else:
            normal_edges.append(edge)

    return laundering_edges, normal_edges


def detect_cycles(edges: list[dict[str, Any]]) -> set[str]:
    adjacency: dict[str, set[str]] = defaultdict(set)
    for edge in edges:
        adjacency[edge["source"]].add(edge["target"])

    cycle_nodes: set[str] = set()
    for start, neighbors in adjacency.items():
        for middle in neighbors:
            for end in adjacency.get(middle, set()):
                if start in adjacency.get(end, set()):
                    cycle_nodes.update({start, middle, end})
    return cycle_nodes


def select_nodes(
    laundering_edges: list[dict[str, Any]],
    normal_edges: list[dict[str, Any]],
    limit: int,
    normal_count: int,
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    in_degree: dict[str, int] = defaultdict(int)
    out_degree: dict[str, int] = defaultdict(int)

    for edge in laundering_edges:
        out_degree[edge["source"]] += 1
        in_degree[edge["target"]] += 1

    fan_out_nodes = {node for node, degree in out_degree.items() if degree > 3}
    fan_in_nodes = {node for node, degree in in_degree.items() if degree > 3}
    cycle_nodes = detect_cycles(laundering_edges)

    selected_nodes: dict[str, dict[str, Any]] = {}
    selected_edges: list[dict[str, Any]] = []

    def upsert_node(node_id: str, category: int, typology: str | None, amount: float) -> None:
        existing = selected_nodes.get(node_id)
        risk_score = 90 if category == 2 else 62 if category == 1 else 15
        color = PRIMARY_800 if category == 2 else PRIMARY_500 if category == 1 else PRIMARY_200
        payload = {
            "id": node_id,
            "name": node_id,
            "value": max(int(amount), 1),
            "category": category,
            "riskScore": risk_score,
            "typology": typology,
            "itemStyle": {"color": color},
        }
        if existing:
            payload["value"] = max(existing["value"], payload["value"])
            payload["riskScore"] = max(existing["riskScore"], payload["riskScore"])
            payload["category"] = max(existing["category"], payload["category"])
            payload["typology"] = existing.get("typology") or typology
            payload["itemStyle"] = {
                "color": PRIMARY_800
                if payload["category"] == 2
                else PRIMARY_500
                if payload["category"] == 1
                else PRIMARY_200
            }
        selected_nodes[node_id] = payload

    for edge in laundering_edges:
        typology = edge["typology"] or None
        if edge["source"] in fan_out_nodes:
            typology = "fan-out"
        elif edge["target"] in fan_in_nodes:
            typology = "fan-in"
        elif edge["source"] in cycle_nodes or edge["target"] in cycle_nodes:
            typology = "cycle"

        upsert_node(edge["source"], 2, typology, edge["amount"])
        upsert_node(edge["target"], 1, typology, edge["amount"])
        selected_edges.append(
            {
                "source": edge["source"],
                "target": edge["target"],
                "value": int(edge["amount"]),
                "lineStyle": {
                    "width": max(1, min(5, int(round(math.log10(max(edge["amount"], 10)))))),
                    "color": PRIMARY_600,
                },
            }
        )

        if len(selected_nodes) >= max(limit - normal_count, 1):
            break

    for edge in normal_edges:
        normal_nodes = [node for node in selected_nodes.values() if node["category"] == 0]
        if len(normal_nodes) >= normal_count:
            break

        upsert_node(edge["source"], 0, None, edge["amount"])
        upsert_node(edge["target"], 0, None, edge["amount"])
        selected_edges.append(
            {
                "source": edge["source"],
                "target": edge["target"],
                "value": int(edge["amount"]),
                "lineStyle": {"width": 1, "color": PRIMARY_100},
            }
        )

    nodes = list(selected_nodes.values())[:limit]
    node_ids = {node["id"] for node in nodes}
    edges = [edge for edge in selected_edges if edge["source"] in node_ids and edge["target"] in node_ids]
    return nodes, edges


def render_module(nodes: list[dict[str, Any]], edges: list[dict[str, Any]]) -> str:
    payload = {
        "categories": [
            {"name": "Normal"},
            {"name": "Suspicious"},
            {"name": "Confirmed Fraud"},
        ],
        "nodes": nodes,
        "edges": edges,
    }
    return "\n".join(
        [
            "export interface NetworkNode {",
            "  id: string;",
            "  name: string;",
            "  value: number;",
            "  category: number;",
            "  riskScore: number;",
            "  typology?: string;",
            "  itemStyle: { color: string };",
            "}",
            "",
            "export interface NetworkEdge {",
            "  source: string;",
            "  target: string;",
            "  value: number;",
            "  lineStyle: {",
            "    width: number;",
            "    color: string;",
            "  };",
            "}",
            "",
            "export interface AmlNetworkData {",
            "  nodes: NetworkNode[];",
            "  edges: NetworkEdge[];",
            "  categories: Array<{ name: string }>;",
            "}",
            "",
            f"export const amlNetworkData: AmlNetworkData = {json.dumps(payload, ensure_ascii=False, indent=2)};",
            "",
        ]
    )


def main() -> None:
    args = parse_args()
    rows = read_rows(Path(args.input))
    laundering_edges, normal_edges = build_graph(rows)
    nodes, edges = select_nodes(laundering_edges, normal_edges, args.limit, args.normal_count)
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(render_module(nodes, edges), encoding="utf-8")
    print(f"Wrote {len(nodes)} nodes and {len(edges)} edges to {output_path}")


if __name__ == "__main__":
    main()
