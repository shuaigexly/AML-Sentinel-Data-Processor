---
title: AML Data Processor
emoji: "📋"
colorFrom: green
colorTo: gray
sdk: gradio
sdk_version: "5.23.3"
app_file: app.py
pinned: false
license: mit
---

# AML Data Processor

Generates real-data TypeScript files for the [AML Sentinel](https://longyuxu.xyz/en/projects/aml-sentinel) portfolio project.

**Data source**: IBM AML HI-Small (NeurIPS 2023) — loaded directly from HuggingFace, no login required.

## What it generates

| File | Content |
|---|---|
| `amlAlerts.ts` | Up to 500 `AmlAlert` records with PBOC rule flags and risk scores |
| `amlCases.ts` | Clustered `AmlCase` records (account-graph connected components) |
| `amlNetworkData.ts` | ECharts force-directed graph (up to 50 nodes, fan-out/fan-in/cycle typologies) |

## Usage

1. Open the Space, set sample size and seed, click **Generate**
2. Download the 3 `.ts` files
3. Copy them to `src/lib/` in the portfolio repo
4. Run `npm run build` to verify

## Note on `amlRegulations.ts`

This Space does not regenerate `amlRegulations.ts` — that file requires the 4 regulatory PDFs
(反洗钱法 2024, KPMG AML analysis, FATF China MER 2019, CAMLMAC Report 2023).
Run `scripts/aml/chunk_regulations.py` locally once those PDFs are available.
