'use client';

import EChartsWrapper from './EChartsWrapper';
import type { EChartsOption } from 'echarts';

interface DistributionData {
  excellent: number;
  needsImprovement: number;
  significant: number;
}

interface ScoreDistributionChartProps {
  data: DistributionData;
  loading?: boolean;
  title?: string;
  className?: string;
}

export default function ScoreDistributionChart({
  data,
  loading = false,
  title = 'QC Score Distribution',
  className = '',
}: ScoreDistributionChartProps) {
  const total = data.excellent + data.needsImprovement + data.significant;

  const chartData = [
    {
      name: 'Excellent (≥80%)',
      value: data.excellent,
      itemStyle: { color: '#0d9488' }, // teal-500
    },
    {
      name: 'Needs Improvement (60-79%)',
      value: data.needsImprovement,
      itemStyle: { color: '#14b8a6' }, // teal-500
    },
    {
      name: 'Significant Gaps (<60%)',
      value: data.significant,
      itemStyle: { color: '#115e59' }, // teal-700
    },
  ].filter((d) => d.value > 0);

  const option: EChartsOption = {
    title: {
      text: title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: unknown) => {
        const p = params as { name: string; value: number; percent: number; marker: string };
        return `
          <div style="padding: 8px;">
            ${p.marker} <strong>${p.name}</strong>
            <div style="margin-top: 4px;">
              Count: <strong>${p.value}</strong> (${p.percent.toFixed(1)}%)
            </div>
          </div>
        `;
      },
    },
    legend: {
      orient: 'horizontal',
      bottom: '0%',
      left: 'center',
    },
    series: [
      {
        name: 'Score Distribution',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: (params: unknown) => {
            const p = params as { name: string; percent: number };
            return `${p.percent.toFixed(0)}%`;
          },
          position: 'inside',
          fontSize: 14,
          fontWeight: 'bold',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        data: chartData,
      },
    ],
    graphic: total === 0 ? [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'No data available',
          fontSize: 14,
          fill: '#9ca3af',
        },
      },
    ] : [],
  };

  return (
    <EChartsWrapper
      option={option}
      loading={loading}
      className={className}
      style={{ height: '300px' }}
    />
  );
}
