from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from pathlib import Path
from typing import Iterable


ZH_STOPWORDS = {"根据", "以及", "进行", "或者", "有关", "应当", "可以", "要求", "规定"}
EN_STOPWORDS = {
    "the",
    "and",
    "for",
    "that",
    "with",
    "from",
    "this",
    "into",
    "their",
    "under",
    "within",
    "shall",
    "must",
    "should",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Chunk AML source files into src/lib/amlRegulations.ts",
    )
    parser.add_argument("--aml-law", required=True, help="Path to aml_law_2024.txt")
    parser.add_argument("--kpmg-pdf", required=True, help="Path to KPMG AML PDF")
    parser.add_argument("--fatf-pdf", required=True, help="Path to FATF PDF")
    parser.add_argument("--camlmac-pdf", required=True, help="Path to CAMLMAC PDF")
    parser.add_argument("--output", default="src/lib/amlRegulations.ts", help="Output TypeScript file")
    return parser.parse_args()


def read_text_file(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def read_pdf_text(path: Path) -> str:
    try:
        from pypdf import PdfReader
    except ImportError as exc:
        raise SystemExit(
            "pypdf is required to read PDF regulations. Install it first, then rerun this script."
        ) from exc

    reader = PdfReader(str(path))
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def split_zh_articles(text: str) -> list[tuple[str, str]]:
    pattern = re.compile(r"(第[\u4e00-\u9fff0-9]+条)")
    parts = pattern.split(text)
    chunks: list[tuple[str, str]] = []
    for index in range(1, len(parts), 2):
        article = parts[index].strip()
        body = parts[index + 1].strip() if index + 1 < len(parts) else ""
        if body:
            chunks.append((article, body))
    return chunks


def split_en_sections(text: str) -> list[tuple[str, str]]:
    pattern = re.compile(
        r"(Recommendation \d+|Immediate Outcome \d+|Article \d+|Section \d+)",
        re.IGNORECASE,
    )
    parts = pattern.split(text)
    chunks: list[tuple[str, str]] = []
    for index in range(1, len(parts), 2):
        article = parts[index].strip()
        body = parts[index + 1].strip() if index + 1 < len(parts) else ""
        if body:
            chunks.append((article, body))
    return chunks


def slide_windows(text: str, chunk_size: int = 512, overlap: int = 64) -> list[str]:
    if len(text) <= chunk_size:
        return [text.strip()]

    chunks: list[str] = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end].strip())
        if end >= len(text):
            break
        start = max(end - overlap, start + 1)
    return [chunk for chunk in chunks if chunk]


def extract_keywords_zh(text: str) -> list[str]:
    try:
        import jieba
    except ImportError:
        terms = re.findall(r"[\u4e00-\u9fff]{2,6}", text)
    else:
        terms = [token.strip() for token in jieba.cut(text) if token.strip()]

    counts = Counter(term for term in terms if term not in ZH_STOPWORDS and len(term) >= 2)
    return [term for term, _ in counts.most_common(8)]


def extract_keywords_en(text: str) -> list[str]:
    tokens = re.findall(r"[A-Za-z][A-Za-z\-]{2,}", text.lower())
    counts = Counter(token for token in tokens if token not in EN_STOPWORDS)
    return [term for term, _ in counts.most_common(8)]


def build_records(
    source: str,
    source_title: str,
    parts: Iterable[tuple[str, str]],
    lang: str,
    start_index: int,
) -> tuple[list[dict[str, object]], int]:
    records: list[dict[str, object]] = []
    index = start_index

    for article, body in parts:
        for window in slide_windows(body):
            keywords = extract_keywords_zh(window) if lang == "zh" else extract_keywords_en(window)
            records.append(
                {
                    "id": f"REG-{index:03d}",
                    "source": source,
                    "sourceTitle": source_title,
                    "article": article,
                    "text": window,
                    "keywords": keywords,
                    "lang": lang,
                }
            )
            index += 1

    return records, index


def render_module(records: list[dict[str, object]]) -> str:
    return "\n".join(
        [
            "export type RegulationSource =",
            "  | 'aml_law_2024'",
            "  | 'kpmg_analysis'",
            "  | 'fatf_china_2019'",
            "  | 'camlmac_report';",
            "",
            "export interface RegulationChunk {",
            "  id: string;",
            "  source: RegulationSource;",
            "  sourceTitle: string;",
            "  article: string;",
            "  text: string;",
            "  keywords: string[];",
            "  lang: 'zh' | 'en';",
            "}",
            "",
            f"export const amlRegulations: RegulationChunk[] = {json.dumps(records, ensure_ascii=False, indent=2)};",
            "",
            "const CJK_PATTERN = /[\\u4e00-\\u9fff]/;",
            "const NORMALIZE_PATTERN = /[，。、“”‘’（）()【】\\[\\],.:;!?/\\\\\\-_]+/g;",
            "",
            "function normalizeText(input: string): string {",
            "  return input.toLowerCase().replace(NORMALIZE_PATTERN, ' ').replace(/\\s+/g, ' ').trim();",
            "}",
            "",
            "function buildCjkTerms(query: string): string[] {",
            "  const compact = query.replace(/\\s+/g, '');",
            "  const terms = new Set<string>();",
            "  if (compact.length <= 2) terms.add(compact);",
            "  for (let index = 0; index < compact.length - 1; index += 1) terms.add(compact.slice(index, index + 2));",
            "  for (const char of compact) terms.add(char);",
            "  return [...terms].filter(Boolean);",
            "}",
            "",
            "export function searchRegulations(query: string, topK = 5): RegulationChunk[] {",
            "  const trimmed = query.trim();",
            "  if (!trimmed) return [];",
            "  const isCjk = CJK_PATTERN.test(trimmed);",
            "  const terms = isCjk ? buildCjkTerms(trimmed) : normalizeText(trimmed).split(' ').filter(Boolean);",
            "  const preferredLang = isCjk ? 'zh' : 'en';",
            "  return amlRegulations",
            "    .map((chunk) => {",
            "      const haystack = normalizeText([chunk.sourceTitle, chunk.article, chunk.text, ...chunk.keywords].join(' '));",
            "      let score = chunk.lang === preferredLang ? 12 : 0;",
            "      for (const term of terms) {",
            "        const normalizedTerm = normalizeText(term);",
            "        if (!normalizedTerm) continue;",
            "        if (haystack.includes(normalizedTerm)) score += normalizedTerm.length >= 2 ? 4 : 1;",
            "        if (chunk.keywords.some((keyword) => normalizeText(keyword).includes(normalizedTerm))) score += 6;",
            "      }",
            "      return { chunk, score };",
            "    })",
            "    .filter(({ score }) => score > 0)",
            "    .sort((left, right) => right.score - left.score)",
            "    .slice(0, topK)",
            "    .map(({ chunk }) => chunk);",
            "}",
            "",
        ]
    )


def main() -> None:
    args = parse_args()
    aml_law_text = read_text_file(Path(args.aml_law))
    kpmg_text = read_pdf_text(Path(args.kpmg_pdf))
    fatf_text = read_pdf_text(Path(args.fatf_pdf))
    camlmac_text = read_pdf_text(Path(args.camlmac_pdf))

    records: list[dict[str, object]] = []
    index = 1

    for source, title, parts, lang in [
        ("aml_law_2024", "中华人民共和国反洗钱法（2024年修订）", split_zh_articles(aml_law_text), "zh"),
        ("kpmg_analysis", "KPMG China New AML Law Analysis", split_en_sections(kpmg_text), "en"),
        ("fatf_china_2019", "FATF China Mutual Evaluation Report 2019", split_en_sections(fatf_text), "en"),
        ("camlmac_report", "CAMLMAC AML Stability Report 2023", split_en_sections(camlmac_text), "en"),
    ]:
        chunk_group, index = build_records(source, title, parts, lang, index)
        records.extend(chunk_group)

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(render_module(records), encoding="utf-8")
    print(f"Wrote {len(records)} regulation chunks to {output_path}")


if __name__ == "__main__":
    main()
