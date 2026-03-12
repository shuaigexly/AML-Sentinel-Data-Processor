'use client';

import EChartsWrapper from './EChartsWrapper';
import type { EChartsOption } from 'echarts';

interface RiskData {
  id: string;
  name: string;
  residualLikelihood: number;
  residualImpact: number;
}

interface RiskMatrixChartProps {
  data: RiskData[];
  loading?: boolean;
  title?: string;
  className?: string;
  onRiskClick?: (risk: RiskData) => void;
}

// Risk level labels
const likelihoodLabels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];
const impactLabels = ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic'];

// Generate heatmap background data (risk score colors)
function generateHeatmapData(): number[][] {
  const data: number[][] = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      // Risk score = (likelihood + 1) * (impact + 1)
      const score = (i + 1) * (j + 1);
      data.push([i, j, score]);
    }
  }
  return data;
}

export default function RiskMatrixChart({
  data,
  loading = false,
  title = 'Risk Matrix',
  className = '',
  onRiskClick,
}: RiskMatrixChartProps) {
  const heatmapData = generateHeatmapData();

  // Convert risks to scatter data
  const scatterData = data.map((risk) => ({
    value: [risk.residualLikelihood - 1, risk.residualImpact - 1, risk],
    name: risk.name,
  }));

  const option: EChartsOption = {
    title: {
      text: title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: unknown) => {
        const p = params as { data: { value: [number, number, RiskData | number] }; seriesType: string };
        if (p.seriesType === 'scatter') {
          const risk = p.data.value[2] as RiskData;
          const score = risk.residualLikelihood * risk.residualImpact;
          const level = score >= 15 ? 'Critical' : score >= 10 ? 'High' : score >= 5 ? 'Medium' : 'Low';
          return `
            <div style="padding: 8px;">
              <div style="font-weight: 600; margin-bottom: 8px;">${risk.name}</div>
              <div>Likelihood: <strong>${likelihoodLabels[risk.residualLikelihood - 1]}</strong> (${risk.residualLikelihood})</div>
              <div>Impact: <strong>${impactLabels[risk.residualImpact - 1]}</strong> (${risk.residualImpact})</div>
              <div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid rgba(0,0,0,0.1);">
                Risk Score: <strong>${score}</strong> (${level})
              </div>
            </div>
          `;
        }
        const score = p.data.value[2] as number;
        const level = score >= 15 ? 'Critical' : score >= 10 ? 'High' : score >= 5 ? 'Medium' : 'Low';
        return `Risk Score: ${score} (${level})`;
      },
    },
    grid: {
      left: '12%',
      right: '10%',
      bottom: '15%',
      top: '15%',
    },
    xAxis: {
      type: 'category',
      data: likelihoodLabels,
      name: 'Likelihood',
      nameLocation: 'middle',
      nameGap: 35,
      splitArea: { show: true },
    },
    yAxis: {
      type: 'category',
      data: impactLabels,
      name: 'Impact',
      nameLocation: 'middle',
      nameGap: 70,
      splitArea: { show: true },
    },
    visualMap: {
      min: 1,
      max: 25,
      calculable: false,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      inRange: {
        color: ['#ccfbf1', '#5eead4', '#2dd4bf', '#0d9488', '#042f2e'], // teal light to dark
      },
      text: ['High Risk', 'Low Risk'],
    },
    series: [
      {
        name: 'Risk Level',
        type: 'heatmap',
        data: heatmapData,
        itemStyle: {
          opacity: 0.8,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      {
        name: 'Risks',
        type: 'scatter',
        data: scatterData as unknown as (number | string)[][],
        symbolSize: 20,
        itemStyle: {
          color: '#1f2937',
          borderColor: '#ffffff',
          borderWidth: 2,
        },
        emphasis: {
          scale: 1.5,
        },
        z: 10,
      },
    ],
  };

  return (
    <EChartsWrapper
      option={option}
      loading={loading}
      className={className}
      style={{ height: '400px' }}
      onChartReady={(chart) => {
        if (onRiskClick) {
          chart.on('click', 'series.scatter', (params: unknown) => {
            const p = params as { data: { value: [number, number, RiskData] } };
            onRiskClick(p.data.value[2]);
          });
        }
      }}
    />
  );
}
