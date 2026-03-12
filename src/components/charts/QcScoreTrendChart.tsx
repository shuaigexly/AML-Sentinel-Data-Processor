'use client';

import EChartsWrapper from './EChartsWrapper';
import type { EChartsOption } from 'echarts';

interface TrendDataPoint {
  date: string;
  averageScore: number;
  count: number;
}

interface QcScoreTrendChartProps {
  data: TrendDataPoint[];
  loading?: boolean;
  title?: string;
  className?: string;
}

export default function QcScoreTrendChart({
  data,
  loading = false,
  title = 'QC Score Trend',
  className = '',
}: QcScoreTrendChartProps) {
  const option: EChartsOption = {
    title: {
      text: title,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: unknown) => {
        const p = (params as Array<{ axisValue: string; value: number; marker: string }>)[0];
        const dataPoint = data.find((d) => d.date === p.axisValue);
        return `
          <div style="padding: 8px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${p.axisValue}</div>
            <div>${p.marker} Score: <strong>${p.value}%</strong></div>
            ${dataPoint ? `<div style="font-size: 12px; opacity: 0.7;">Analyses: ${dataPoint.count}</div>` : ''}
          </div>
        `;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map((d) => d.date),
      axisLabel: {
        formatter: (value: string) => {
          const date = new Date(value);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        },
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value}%',
      },
    },
    series: [
      {
        name: 'QC Score',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        data: data.map((d) => d.averageScore),
        areaStyle: {
          opacity: 0.3,
        },
        emphasis: {
          focus: 'series',
        },
        markLine: {
          silent: true,
          lineStyle: {
            color: '#0d9488',
            type: 'dashed',
          },
          data: [
            {
              yAxis: 80,
              label: {
                formatter: 'Target: 80%',
                position: 'end',
              },
            },
          ],
        },
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
