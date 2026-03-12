'use client';

import EChartsWrapper from './EChartsWrapper';
import type { EChartsOption } from 'echarts';

interface CategoryData {
  category: string;
  averageScore: number;
  maxScore: number;
  percentage: number;
}

interface CategoryRadarChartProps {
  data: CategoryData[];
  loading?: boolean;
  title?: string;
  className?: string;
}

// Category display names
const categoryLabels: Record<string, string> = {
  completeness: 'Completeness',
  traceability: 'Traceability',
  samplingRationale: 'Sampling',
  evidenceSufficiency: 'Evidence',
  conclusionQuality: 'Conclusion',
  professionalTone: 'Tone',
};

export default function CategoryRadarChart({
  data,
  loading = false,
  title = 'QC Category Analysis',
  className = '',
}: CategoryRadarChartProps) {
  const indicators = data.map((d) => ({
    name: categoryLabels[d.category] || d.category,
    max: 100,
  }));

  const values = data.map((d) => d.percentage);

  const option: EChartsOption = {
    title: {
      text: title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: unknown) => {
        const p = params as { name: string; value: number[] };
        const categoryData = data.map((d, i) => ({
          name: categoryLabels[d.category] || d.category,
          value: p.value[i],
          score: d.averageScore,
          max: d.maxScore,
        }));
        return `
          <div style="padding: 8px;">
            <div style="font-weight: 600; margin-bottom: 8px;">Category Breakdown</div>
            ${categoryData
              .map(
                (c) => `
              <div style="display: flex; justify-content: space-between; gap: 16px; margin: 4px 0;">
                <span>${c.name}</span>
                <span><strong>${c.value}%</strong> (${c.score}/${c.max})</span>
              </div>
            `
              )
              .join('')}
          </div>
        `;
      },
    },
    radar: {
      indicator: indicators,
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        formatter: '{value}',
        fontSize: 12,
      },
      splitArea: {
        show: true,
        areaStyle: {
          opacity: 0.1,
        },
      },
      axisLine: {
        lineStyle: {
          opacity: 0.3,
        },
      },
      splitLine: {
        lineStyle: {
          opacity: 0.3,
        },
      },
    },
    series: [
      {
        name: 'QC Score',
        type: 'radar',
        data: [
          {
            value: values,
            name: 'Average Score',
            areaStyle: {
              opacity: 0.4,
            },
            lineStyle: {
              width: 2,
            },
            symbol: 'circle',
            symbolSize: 6,
          },
        ],
      },
    ],
  };

  return (
    <EChartsWrapper
      option={option}
      loading={loading}
      className={className}
      style={{ height: '350px' }}
    />
  );
}
