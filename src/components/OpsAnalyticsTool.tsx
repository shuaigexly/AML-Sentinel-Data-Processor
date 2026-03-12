'use client';

import { useState, useEffect } from 'react';

interface Metric {
  key: string;
  labelZh: string;
  labelEn: string;
  control: number;
  treatment: number;
  unit: string;
  higherIsBetter: boolean;
  pValue: number;
}

interface Experiment {
  idZh: string;
  idEn: string;
  descZh: string;
  descEn: string;
  sampleControl: number;
  sampleTreatment: number;
  durationDays: number;
  confidence: number;
  metrics: Metric[];
  conclusionZh: string;
  conclusionEn: string;
  resultColor: string;
}

const EXPERIMENTS: Experiment[] = [
  {
    idZh: '结账流程简化实验',
    idEn: 'Checkout Flow Simplification',
    descZh: '将结账步骤从 4 步压缩至 2 步，去除强制注册环节',
    descEn: 'Reduce checkout steps from 4 to 2, remove mandatory registration',
    sampleControl: 24830,
    sampleTreatment: 25110,
    durationDays: 14,
    confidence: 99.2,
    resultColor: '#0d9488',
    metrics: [
      { key: 'conv', labelZh: '支付转化率', labelEn: 'Payment Conv. Rate', control: 3.42, treatment: 4.81, unit: '%', higherIsBetter: true, pValue: 0.0003 },
      { key: 'bounce', labelZh: '结账放弃率', labelEn: 'Cart Abandon Rate', control: 68.4, treatment: 54.7, unit: '%', higherIsBetter: false, pValue: 0.0001 },
      { key: 'time', labelZh: '完成时长（秒）', labelEn: 'Completion Time (s)', control: 142, treatment: 87, unit: 's', higherIsBetter: false, pValue: 0.0002 },
      { key: 'arpu', labelZh: 'ARPU（¥）', labelEn: 'ARPU (¥)', control: 38.2, treatment: 41.7, unit: '¥', higherIsBetter: true, pValue: 0.041 },
    ],
    conclusionZh: '结果显著：支付转化率提升 40.6%（3.42% → 4.81%），结账放弃率下降 13.7pp，统计置信度 99.2%。建议立即全量上线。',
    conclusionEn: 'Significant result: Payment conversion +40.6% (3.42% → 4.81%), cart abandonment -13.7pp, confidence 99.2%. Recommend immediate full rollout.',
  },
  {
    idZh: '首页个性化推荐实验',
    idEn: 'Homepage Personalization Test',
    descZh: '基于协同过滤的个性化首页商品推荐替代静态编辑位',
    descEn: 'Collaborative filtering personalized homepage vs. static editorial placements',
    sampleControl: 41200,
    sampleTreatment: 40890,
    durationDays: 21,
    confidence: 97.8,
    resultColor: '#14b8a6',
    metrics: [
      { key: 'ctr', labelZh: '点击率 (CTR)', labelEn: 'Click-through Rate', control: 4.1, treatment: 5.8, unit: '%', higherIsBetter: true, pValue: 0.002 },
      { key: 'add', labelZh: '加购率', labelEn: 'Add-to-Cart Rate', control: 1.9, treatment: 2.6, unit: '%', higherIsBetter: true, pValue: 0.008 },
      { key: 'dwell', labelZh: '页面停留（秒）', labelEn: 'Dwell Time (s)', control: 68, treatment: 91, unit: 's', higherIsBetter: true, pValue: 0.0005 },
      { key: 'bounce_hp', labelZh: '首页跳出率', labelEn: 'Homepage Bounce Rate', control: 44.2, treatment: 38.7, unit: '%', higherIsBetter: false, pValue: 0.021 },
    ],
    conclusionZh: '个性化推荐带来显著提升：CTR +41%，加购率 +37%，停留时长 +34%。建议全量推进，并针对冷启动用户单独建立 fallback 策略。',
    conclusionEn: 'Personalization drives significant uplift: CTR +41%, Add-to-Cart +37%, Dwell +34%. Recommend full rollout with cold-start fallback strategy for new users.',
  },
  {
    idZh: '付费通知推送策略实验',
    idEn: 'Payment Notification Push Experiment',
    descZh: '测试订单确认推送的发送时机：即时 vs. 延迟 2 分钟发送',
    descEn: 'Order confirmation push: immediate vs. 2-minute delayed delivery',
    sampleControl: 18340,
    sampleTreatment: 18520,
    durationDays: 10,
    confidence: 84.3,
    resultColor: '#0f766e',
    metrics: [
      { key: 'open', labelZh: '推送打开率', labelEn: 'Push Open Rate', control: 28.4, treatment: 29.1, unit: '%', higherIsBetter: true, pValue: 0.21 },
      { key: 'reorder', labelZh: '复购率（7d）', labelEn: 'Reorder Rate (7d)', control: 12.3, treatment: 12.8, unit: '%', higherIsBetter: true, pValue: 0.18 },
      { key: 'unsubscribe', labelZh: '取消订阅率', labelEn: 'Unsubscribe Rate', control: 0.8, treatment: 0.7, unit: '%', higherIsBetter: false, pValue: 0.44 },
    ],
    conclusionZh: '结果不显著（置信度 84.3%，未达 95% 阈值）。各指标差异均在统计误差范围内。建议延长实验至 20 天以获得更大样本量，或重新设计实验变量。',
    conclusionEn: 'Inconclusive result (confidence 84.3%, below 95% threshold). All metric deltas are within statistical noise. Recommend extending to 20 days for larger sample, or redesigning the treatment variable.',
  },
];

// ── Significance Gauge ────────────────────────────────────────
function SignificanceGauge({ confidence, animated }: { confidence: number; animated: boolean }) {
  const r = 40;
  const circumference = Math.PI * r; // half circle
  const pct = animated ? Math.min(confidence, 100) / 100 : 0;
  const offset = circumference * (1 - pct);

  const color = confidence >= 99 ? '#0d9488' : confidence >= 95 ? '#14b8a6' : confidence >= 90 ? '#0f766e' : '#115e59';
  const labelZh = confidence >= 99 ? '高度显著' : confidence >= 95 ? '显著' : confidence >= 90 ? '边缘显著' : '不显著';
  const labelEn = confidence >= 99 ? 'Highly Sig.' : confidence >= 95 ? 'Significant' : confidence >= 90 ? 'Marginal' : 'Not Sig.';

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 55" className="w-32">
        {/* Track */}
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" />
        {/* Value arc */}
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s ease' }}
        />
        {/* 95% marker */}
        <line x1="88" y1="22" x2="83" y2="26" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="90" y="20" textAnchor="middle" fontSize="6" fill="#9ca3af">95%</text>
        {/* Value text */}
        <text x="50" y="42" textAnchor="middle" fontSize="14" fontWeight="800" fill={color}>
          {animated ? confidence.toFixed(1) : '0.0'}%
        </text>
      </svg>
      <span className="mt-1 text-xs font-bold" style={{ color }}>{labelZh} / {labelEn}</span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function OpsAnalyticsTool({ isZh = true }: { isZh?: boolean }) {
  const [expIndex, setExpIndex] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [expIndex]);

  const exp = EXPERIMENTS[expIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-primary-500/25 bg-primary-500/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          {isZh ? 'A/B 测试 · 统计显著性分析' : 'A/B Testing · Statistical Significance'}
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          {isZh ? '运营分析仪表板' : 'Operations Analytics Dashboard'}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {isZh
            ? '完整 A/B 实验结果：样本量、置信度计量仪、指标对比、统计显著性与决策建议。'
            : 'Full A/B experiment results: sample sizes, significance gauge, metric comparison, statistical significance and decision recommendations.'}
        </p>
      </div>

      {/* Experiment selector */}
      <div className="flex flex-wrap gap-2">
        {EXPERIMENTS.map((e, i) => (
          <button key={i} onClick={() => setExpIndex(i)}
            className={`rounded-xl border px-3.5 py-1.5 text-xs font-medium transition-all ${
              expIndex === i
                ? 'border-primary-500 bg-primary-500 text-white shadow-md shadow-primary-500/20'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary-400/40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'
            }`}
          >
            {isZh ? e.idZh : e.idEn}
          </button>
        ))}
      </div>

      {/* Experiment meta */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
        <p className="mb-1 text-sm font-bold text-gray-800 dark:text-gray-100">{isZh ? exp.idZh : exp.idEn}</p>
        <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">{isZh ? exp.descZh : exp.descEn}</p>

        {/* Top row: sample sizes + duration + gauge */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-400">{isZh ? '对照组' : 'Control'}</p>
              <p className="text-xl font-black text-gray-700 dark:text-gray-200">{exp.sampleControl.toLocaleString()}</p>
              <p className="text-[10px] text-gray-400">{isZh ? '用户' : 'users'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">{isZh ? '实验组' : 'Treatment'}</p>
              <p className="text-xl font-black text-gray-700 dark:text-gray-200">{exp.sampleTreatment.toLocaleString()}</p>
              <p className="text-[10px] text-gray-400">{isZh ? '用户' : 'users'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">{isZh ? '实验天数' : 'Duration'}</p>
              <p className="text-xl font-black text-gray-700 dark:text-gray-200">{exp.durationDays}</p>
              <p className="text-[10px] text-gray-400">{isZh ? '天' : 'days'}</p>
            </div>
          </div>
          <SignificanceGauge confidence={exp.confidence} animated={animated} />
        </div>
      </div>

      {/* Metrics comparison */}
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          {isZh ? '指标对比' : 'Metric Comparison'}
        </p>
        <div className="space-y-3">
          {exp.metrics.map((m) => {
            const delta = ((m.treatment - m.control) / m.control) * 100;
            const absChange = m.treatment - m.control;
            const isGood = m.higherIsBetter ? delta > 0 : delta < 0;
            const isSignificant = m.pValue < 0.05;
            const barMax = Math.max(m.control, m.treatment);

            return (
              <div key={m.key} className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{isZh ? m.labelZh : m.labelEn}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${isSignificant ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'}`}>
                      {isSignificant ? (isZh ? '显著' : 'Sig.') : (isZh ? '不显著' : 'N.S.')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-black ${isGood ? 'text-primary-600 dark:text-primary-400' : 'text-primary-500'}`}>
                      {delta > 0 ? '+' : ''}{delta.toFixed(1)}%
                    </span>
                    <span className="text-xs text-gray-400">
                      {absChange > 0 ? '+' : ''}{m.unit === '%' || m.unit === 's' ? absChange.toFixed(1) : Math.round(absChange)}{m.unit === '%' ? 'pp' : m.unit === 's' ? 's' : ''}
                    </span>
                    <span className="text-[10px] text-gray-400">p={m.pValue < 0.001 ? '<0.001' : m.pValue.toFixed(3)}</span>
                  </div>
                </div>

                {/* Dual bar visualization */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-14 shrink-0 text-[11px] text-gray-400">{isZh ? '对照组' : 'Control'}</span>
                    <div className="flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800" style={{ height: 8 }}>
                      <div className="h-full rounded-full bg-gray-400 transition-all duration-700"
                        style={{ width: animated ? `${(m.control / barMax) * 100}%` : '0%' }}
                      />
                    </div>
                    <span className="w-14 shrink-0 text-right text-xs font-semibold text-gray-500">{m.control}{m.unit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-14 shrink-0 text-[11px] text-gray-400">{isZh ? '实验组' : 'Treatment'}</span>
                    <div className="flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800" style={{ height: 8 }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: animated ? `${(m.treatment / barMax) * 100}%` : '0%',
                          background: isGood ? exp.resultColor : '#134e4a',
                        }}
                      />
                    </div>
                    <span className="w-14 shrink-0 text-right text-xs font-bold" style={{ color: isGood ? exp.resultColor : '#134e4a' }}>
                      {m.treatment}{m.unit}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decision recommendation */}
      <div className="relative overflow-hidden rounded-2xl border p-5"
        style={{ borderColor: `${exp.resultColor}40`, background: `${exp.resultColor}08` }}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-bl-full"
          style={{ background: `linear-gradient(135deg, ${exp.resultColor}10, transparent)` }}
        />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: `${exp.resultColor}18` }}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: exp.resultColor }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: exp.resultColor }}>{isZh ? '实验结论与决策建议' : 'Conclusion & Decision'}</p>
              <p className="text-[11px] text-gray-500">{isZh ? `统计置信度 ${exp.confidence}%` : `Statistical confidence ${exp.confidence}%`}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {isZh ? exp.conclusionZh : exp.conclusionEn}
          </p>
        </div>
      </div>
    </div>
  );
}
