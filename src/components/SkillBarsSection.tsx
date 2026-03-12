'use client';

import { useEffect, useRef, useState } from 'react';

const SKILL_GROUPS = [
  {
    title: 'Analytics & Data Tools',
    titleZh: '数据分析工具',
    accent: 'bg-primary-500',
    accentLight: 'bg-primary-500/10 text-primary-700 dark:text-primary-400',
    skills: [
      { name: 'Python', pct: 90 },
      { name: 'SQL', pct: 86 },
      { name: 'Power BI', pct: 80 },
      { name: 'ECharts / D3', pct: 75 },
      { name: 'R', pct: 65 },
    ],
  },
  {
    title: 'AI / LLM Engineering',
    titleZh: 'AI 大模型工程',
    accent: 'bg-primary-600',
    accentLight: 'bg-primary-600/10 text-primary-700 dark:text-primary-400',
    skills: [
      { name: 'Prompt Engineering', pct: 90 },
      { name: 'RAG & Retrieval', pct: 85 },
      { name: 'LangChain / LangGraph', pct: 80 },
      { name: 'ML Modeling', pct: 72 },
      { name: 'Vector Databases', pct: 75 },
    ],
  },
  {
    title: 'Finance & Risk',
    titleZh: '金融与风险管理',
    accent: 'bg-primary-700',
    accentLight: 'bg-primary-700/10 text-primary-800 dark:text-primary-300',
    skills: [
      { name: 'Financial Analysis', pct: 90 },
      { name: 'Risk Modeling', pct: 86 },
      { name: 'Regulatory Compliance', pct: 82 },
      { name: 'A/B Testing & Stats', pct: 78 },
      { name: 'Statistical Inference', pct: 76 },
    ],
  },
];

function SkillBar({
  name, pct, accent, animate, idx,
}: {
  name: string; pct: number; accent: string; animate: boolean; idx: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{name}</span>
        <span className="text-[10px] font-bold tabular-nums text-gray-400 dark:text-gray-500">{pct}%</span>
      </div>
      <div className="h-[5px] overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className={`h-full rounded-full ${accent}`}
          style={{
            width: animate ? `${pct}%` : '0%',
            transition: `width 900ms cubic-bezier(0.16,1,0.3,1)`,
            transitionDelay: `${idx * 90}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function SkillBarsSection({ isZh }: { isZh: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-3">
      {SKILL_GROUPS.map((group) => (
        <div
          key={group.title}
          className="gradient-border bento-card rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-900/60"
        >
          {/* Accent top bar */}
          <div className={`mb-3 h-0.5 w-10 rounded-full ${group.accent}`} />

          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-widest text-gray-800 dark:text-gray-100">
            {isZh ? group.titleZh : group.title}
          </h3>

          <div className="space-y-4">
            {group.skills.map((s, i) => (
              <SkillBar
                key={s.name}
                name={s.name}
                pct={s.pct}
                accent={group.accent}
                animate={animate}
                idx={i}
              />
            ))}
          </div>

          {/* Top proficiency label */}
          <div className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${group.accentLight}`}>
            <span>Top: {group.skills[0].name}</span>
            <span className="opacity-60">·</span>
            <span>{group.skills[0].pct}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
