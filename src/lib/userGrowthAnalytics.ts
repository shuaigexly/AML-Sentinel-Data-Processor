// ─── Types ──────────────────────────────────────────────

export interface AARRRInput {
  totalVisitors: number;
  signups: number;
  activatedUsers: number;
  retainedD7Users: number;
  payingUsers: number;
  referrals: number;
  adSpend: number;
}

export interface AARRRResult {
  stages: {
    name: string;
    value: number;
    rate: number;
    dropoff: number;
  }[];
  cac: number;
  ltvCacRatio: number;
  stickiness: number;
}

export interface CohortRow {
  cohortDate: string;
  cohortSize: number;
  retention: number[]; // [D0, D1, D3, D7, D14, D30]
}

export interface CohortResult {
  cohorts: CohortRow[];
  averageRetention: number[];
}

export interface ChannelRow {
  name: string;
  users: number;
  spend: number;
  conversions: number;
}

export interface ChannelResult {
  channels: {
    name: string;
    users: number;
    spend: number;
    cac: number;
    ltv: number;
    roi: number;
    convRate: number;
  }[];
  blendedCAC: number;
  blendedROI: number;
  topChannel: string;
}

export interface ABTestInput {
  controlVisitors: number;
  controlConversions: number;
  variantVisitors: number;
  variantConversions: number;
  confidenceLevel: 90 | 95 | 99;
}

export interface ABTestResult {
  controlRate: number;
  variantRate: number;
  relativeImprovement: number;
  pValue: number;
  isSignificant: boolean;
  recommendation: 'deploy' | 'keep' | 'inconclusive';
  confidenceInterval: [number, number];
  zScore: number;
}

export interface CompetitorRow {
  name: string;
  scores: Record<string, number>; // dimension -> score (1-10)
}

// ─── AARRR Funnel ───────────────────────────────────────

export function calculateAARRR(input: AARRRInput): AARRRResult {
  const { totalVisitors, signups, activatedUsers, retainedD7Users, payingUsers, referrals, adSpend } = input;

  const stages = [
    { name: 'Acquisition', value: signups, rate: totalVisitors > 0 ? (signups / totalVisitors) * 100 : 0 },
    { name: 'Activation', value: activatedUsers, rate: signups > 0 ? (activatedUsers / signups) * 100 : 0 },
    { name: 'Retention', value: retainedD7Users, rate: activatedUsers > 0 ? (retainedD7Users / activatedUsers) * 100 : 0 },
    { name: 'Revenue', value: payingUsers, rate: retainedD7Users > 0 ? (payingUsers / retainedD7Users) * 100 : 0 },
    { name: 'Referral', value: referrals, rate: payingUsers > 0 ? (referrals / payingUsers) * 100 : 0 },
  ].map((stage, i, arr) => ({
    ...stage,
    dropoff: i === 0
      ? totalVisitors > 0 ? ((totalVisitors - stage.value) / totalVisitors) * 100 : 0
      : arr[i - 1].value > 0 ? ((arr[i - 1].value - stage.value) / arr[i - 1].value) * 100 : 0,
  }));

  const cac = signups > 0 ? adSpend / signups : 0;
  const arpu = payingUsers > 0 ? (adSpend * 0.3) / payingUsers : 0; // estimated
  const ltvCacRatio = cac > 0 ? (arpu * 12) / cac : 0;
  const stickiness = signups > 0 ? (retainedD7Users / signups) * 100 : 0;

  return { stages, cac, ltvCacRatio, stickiness };
}

// ─── Cohort Retention ───────────────────────────────────

export function calculateCohortRetention(cohorts: CohortRow[]): CohortResult {
  const periods = 6; // D0, D1, D3, D7, D14, D30
  const averageRetention = Array(periods).fill(0);
  let validCounts = Array(periods).fill(0);

  for (const cohort of cohorts) {
    for (let i = 0; i < periods && i < cohort.retention.length; i++) {
      if (cohort.retention[i] >= 0) {
        averageRetention[i] += cohort.retention[i];
        validCounts[i]++;
      }
    }
  }

  for (let i = 0; i < periods; i++) {
    averageRetention[i] = validCounts[i] > 0
      ? Math.round((averageRetention[i] / validCounts[i]) * 10) / 10
      : 0;
  }

  return { cohorts, averageRetention };
}

// ─── Channel Attribution ────────────────────────────────

export function analyzeChannels(channels: ChannelRow[]): ChannelResult {
  const avgLtvMultiplier = 45; // average LTV per converted user ($)

  const analyzed = channels.map((ch) => {
    const cac = ch.users > 0 ? ch.spend / ch.users : 0;
    const ltv = ch.conversions > 0 ? (ch.conversions / ch.users) * avgLtvMultiplier : 0;
    const roi = ch.spend > 0 ? ((ltv * ch.users - ch.spend) / ch.spend) * 100 : 0;
    const convRate = ch.users > 0 ? (ch.conversions / ch.users) * 100 : 0;
    return { name: ch.name, users: ch.users, spend: ch.spend, cac, ltv, roi, convRate };
  });

  const totalSpend = analyzed.reduce((s, c) => s + c.spend, 0);
  const totalUsers = analyzed.reduce((s, c) => s + c.users, 0);
  const blendedCAC = totalUsers > 0 ? totalSpend / totalUsers : 0;
  const totalRevenue = analyzed.reduce((s, c) => s + c.ltv * c.users, 0);
  const blendedROI = totalSpend > 0 ? ((totalRevenue - totalSpend) / totalSpend) * 100 : 0;

  const sorted = [...analyzed].sort((a, b) => b.roi - a.roi);
  const topChannel = sorted.length > 0 ? sorted[0].name : '';

  return { channels: analyzed, blendedCAC, blendedROI, topChannel };
}

// ─── A/B Test Significance ──────────────────────────────

function normalCDF(z: number): number {
  // Approximation of the standard normal CDF
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * y);
}

export function calculateABTest(input: ABTestInput): ABTestResult {
  const { controlVisitors, controlConversions, variantVisitors, variantConversions, confidenceLevel } = input;

  const p1 = controlVisitors > 0 ? controlConversions / controlVisitors : 0;
  const p2 = variantVisitors > 0 ? variantConversions / variantVisitors : 0;

  const pooledP = (controlConversions + variantConversions) / (controlVisitors + variantVisitors);
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / controlVisitors + 1 / variantVisitors));

  const zScore = se > 0 ? (p2 - p1) / se : 0;
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore))); // two-tailed

  const zThresholds: Record<number, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };
  const zThreshold = zThresholds[confidenceLevel] || 1.96;
  const isSignificant = Math.abs(zScore) > zThreshold;

  const relativeImprovement = p1 > 0 ? ((p2 - p1) / p1) * 100 : 0;

  // Confidence interval for the difference
  const seDiff = Math.sqrt((p1 * (1 - p1)) / controlVisitors + (p2 * (1 - p2)) / variantVisitors);
  const diff = p2 - p1;
  const ciLower = (diff - zThreshold * seDiff) * 100;
  const ciUpper = (diff + zThreshold * seDiff) * 100;

  let recommendation: 'deploy' | 'keep' | 'inconclusive';
  if (isSignificant && p2 > p1) {
    recommendation = 'deploy';
  } else if (isSignificant && p2 <= p1) {
    recommendation = 'keep';
  } else {
    recommendation = 'inconclusive';
  }

  return {
    controlRate: p1 * 100,
    variantRate: p2 * 100,
    relativeImprovement,
    pValue,
    isSignificant,
    recommendation,
    confidenceInterval: [ciLower, ciUpper],
    zScore,
  };
}

// ─── Example Data Generators ────────────────────────────

export const exampleAARRRData: AARRRInput = {
  totalVisitors: 100000,
  signups: 12000,
  activatedUsers: 7800,
  retainedD7Users: 3200,
  payingUsers: 960,
  referrals: 288,
  adSpend: 50000,
};

export const exampleCohortData: CohortRow[] = [
  { cohortDate: '2025-W01', cohortSize: 1200, retention: [100, 45, 32, 24, 18, 12] },
  { cohortDate: '2025-W02', cohortSize: 1350, retention: [100, 48, 35, 27, 20, 14] },
  { cohortDate: '2025-W03', cohortSize: 1100, retention: [100, 42, 30, 22, 16, 11] },
  { cohortDate: '2025-W04', cohortSize: 1500, retention: [100, 50, 38, 29, 22, 16] },
  { cohortDate: '2025-W05', cohortSize: 1400, retention: [100, 47, 34, 26, 19, 13] },
  { cohortDate: '2025-W06', cohortSize: 1600, retention: [100, 52, 40, 31, 24, 17] },
];

export const exampleChannelData: ChannelRow[] = [
  { name: 'Google Ads', users: 3500, spend: 15000, conversions: 420 },
  { name: 'WeChat Ads', users: 2800, spend: 8000, conversions: 504 },
  { name: 'Douyin (TikTok)', users: 4200, spend: 12000, conversions: 630 },
  { name: 'Xiaohongshu', users: 1800, spend: 5000, conversions: 360 },
  { name: 'App Store ASO', users: 2200, spend: 3000, conversions: 440 },
  { name: 'KOL Referral', users: 1500, spend: 7000, conversions: 375 },
  { name: 'Content SEO', users: 1200, spend: 2000, conversions: 300 },
  { name: 'Email Campaign', users: 800, spend: 1500, conversions: 200 },
];

export const exampleABTestInput: ABTestInput = {
  controlVisitors: 25000,
  controlConversions: 1500,
  variantVisitors: 25000,
  variantConversions: 1750,
  confidenceLevel: 95,
};

export const exampleCompetitors: CompetitorRow[] = [
  { name: 'Our Product', scores: { userExperience: 8, featureRichness: 7, performance: 9, pricing: 7, ecosystem: 6, innovation: 8 } },
  { name: 'Competitor A', scores: { userExperience: 7, featureRichness: 9, performance: 7, pricing: 5, ecosystem: 9, innovation: 6 } },
  { name: 'Competitor B', scores: { userExperience: 6, featureRichness: 6, performance: 8, pricing: 9, ecosystem: 5, innovation: 7 } },
];

// ─── Markdown Export ────────────────────────────────────

export function generateMarkdownReport(
  aarrrResult: AARRRResult | null,
  cohortResult: CohortResult | null,
  channelResult: ChannelResult | null,
  abTestResult: ABTestResult | null,
  competitors: CompetitorRow[],
): string {
  let md = '# User Growth Analytics Report\n\n';
  md += `_Generated: ${new Date().toISOString().split('T')[0]}_\n\n`;

  if (aarrrResult) {
    md += '## AARRR Funnel\n\n';
    md += '| Stage | Users | Conversion Rate | Drop-off |\n';
    md += '|-------|-------|----------------|----------|\n';
    for (const s of aarrrResult.stages) {
      md += `| ${s.name} | ${s.value.toLocaleString()} | ${s.rate.toFixed(1)}% | ${s.dropoff.toFixed(1)}% |\n`;
    }
    md += `\n- **CAC**: $${aarrrResult.cac.toFixed(2)}\n`;
    md += `- **LTV:CAC Ratio**: ${aarrrResult.ltvCacRatio.toFixed(2)}\n`;
    md += `- **Stickiness**: ${aarrrResult.stickiness.toFixed(1)}%\n\n`;
  }

  if (cohortResult) {
    md += '## Cohort Retention\n\n';
    md += '| Cohort | Size | D0 | D1 | D3 | D7 | D14 | D30 |\n';
    md += '|--------|------|-----|-----|-----|-----|------|------|\n';
    for (const c of cohortResult.cohorts) {
      md += `| ${c.cohortDate} | ${c.cohortSize} | ${c.retention.map((r) => `${r}%`).join(' | ')} |\n`;
    }
    md += `\n**Avg Retention**: ${cohortResult.averageRetention.map((r) => `${r}%`).join(' → ')}\n\n`;
  }

  if (channelResult) {
    md += '## Channel Attribution\n\n';
    md += '| Channel | Users | CAC | LTV | ROI | Conv Rate |\n';
    md += '|---------|-------|-----|-----|-----|-----------|\n';
    for (const c of channelResult.channels) {
      md += `| ${c.name} | ${c.users.toLocaleString()} | $${c.cac.toFixed(2)} | $${c.ltv.toFixed(2)} | ${c.roi.toFixed(1)}% | ${c.convRate.toFixed(1)}% |\n`;
    }
    md += `\n- **Blended CAC**: $${channelResult.blendedCAC.toFixed(2)}\n`;
    md += `- **Blended ROI**: ${channelResult.blendedROI.toFixed(1)}%\n`;
    md += `- **Top Channel**: ${channelResult.topChannel}\n\n`;
  }

  if (abTestResult) {
    md += '## A/B Test Results\n\n';
    md += `- **Control Rate**: ${abTestResult.controlRate.toFixed(2)}%\n`;
    md += `- **Variant Rate**: ${abTestResult.variantRate.toFixed(2)}%\n`;
    md += `- **Relative Improvement**: ${abTestResult.relativeImprovement.toFixed(2)}%\n`;
    md += `- **P-Value**: ${abTestResult.pValue.toFixed(4)}\n`;
    md += `- **Significant**: ${abTestResult.isSignificant ? 'Yes' : 'No'}\n`;
    md += `- **Recommendation**: ${abTestResult.recommendation}\n\n`;
  }

  if (competitors.length > 0) {
    md += '## Competitive Matrix\n\n';
    const dims = Object.keys(competitors[0]?.scores || {});
    md += `| Product | ${dims.join(' | ')} |\n`;
    md += `|---------|${dims.map(() => '---').join('|')}|\n`;
    for (const c of competitors) {
      md += `| ${c.name} | ${dims.map((d) => c.scores[d] || 0).join(' | ')} |\n`;
    }
  }

  return md;
}
