'use client';

const C = 'text-gray-500 dark:text-gray-400';
const D_P = 'bg-primary-500';
const D_G = 'bg-gray-400';

const ROW1 = [
  { name: 'Python',             color: C, dot: D_P },
  { name: 'SQL',                color: C, dot: D_G },
  { name: 'LangChain',          color: C, dot: D_P },
  { name: 'LangGraph',          color: C, dot: D_G },
  { name: 'Power BI',           color: C, dot: D_P },
  { name: 'RAG',                color: C, dot: D_G },
  { name: 'Next.js',            color: C, dot: D_P },
  { name: 'ECharts',            color: C, dot: D_G },
  { name: 'Pandas',             color: C, dot: D_P },
  { name: 'VaR / CVaR',         color: C, dot: D_G },
  { name: 'Financial Risk',     color: C, dot: D_P },
  { name: 'TypeScript',         color: C, dot: D_G },
];

const ROW2 = [
  { name: 'Prompt Engineering',     color: C, dot: D_G },
  { name: 'Machine Learning',       color: C, dot: D_P },
  { name: 'Financial Analysis',     color: C, dot: D_G },
  { name: 'A/B Testing',            color: C, dot: D_P },
  { name: 'Regulatory Compliance',  color: C, dot: D_G },
  { name: 'Audit Automation',       color: C, dot: D_P },
  { name: 'D3.js',                  color: C, dot: D_G },
  { name: 'Risk Modeling',          color: C, dot: D_P },
  { name: 'Vector DB',              color: C, dot: D_G },
  { name: 'PBOC / SAFE',            color: C, dot: D_P },
  { name: 'Compliance Review',      color: C, dot: D_G },
  { name: 'Data Pipeline',          color: C, dot: D_P },
];

function MarqueeItem({ name, color, dot }: { name: string; color: string; dot: string }) {
  return (
    <span className="mx-3 inline-flex shrink-0 items-center gap-2">
      <span className={`h-1.5 w-1.5 rounded-full ${dot} opacity-70`} />
      <span className={`text-sm font-semibold tracking-wide ${color} opacity-80`}>{name}</span>
    </span>
  );
}

export default function TechMarquee() {
  const doubled1 = [...ROW1, ...ROW1];
  const doubled2 = [...ROW2, ...ROW2];

  return (
    <div className="relative overflow-hidden py-6 select-none">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background-light to-transparent dark:from-background-dark" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background-light to-transparent dark:from-background-dark" />

      {/* Row 1 — scrolls left */}
      <div className="mb-3 flex">
        <div className="marquee-track marquee-left">
          {doubled1.map((item, i) => (
            <MarqueeItem key={`r1-${i}`} {...item} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="flex">
        <div className="marquee-track marquee-right">
          {doubled2.map((item, i) => (
            <MarqueeItem key={`r2-${i}`} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
