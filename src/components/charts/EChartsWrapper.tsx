'use client';

import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import {
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  HeatmapChart,
  GraphChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  RadarComponent,
  VisualMapComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';
import type { EChartsType } from 'echarts/core';

// Register ECharts components
echarts.use([
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  HeatmapChart,
  GraphChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  RadarComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

// Theme colors
const lightTheme = {
  backgroundColor: 'transparent',
  textStyle: {
    color: '#374151', // gray-700
  },
  title: {
    textStyle: {
      color: '#111827', // gray-900
    },
    subtextStyle: {
      color: '#6b7280', // gray-500
    },
  },
  legend: {
    textStyle: {
      color: '#374151',
    },
  },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e5e7eb',
    textStyle: {
      color: '#111827',
    },
  },
  axisLine: {
    lineStyle: {
      color: '#d1d5db', // gray-300
    },
  },
  splitLine: {
    lineStyle: {
      color: '#e5e7eb', // gray-200
    },
  },
  colorPalette: [
    '#0d9488', // teal-500
    '#14b8a6', // teal-500 alt
    '#0f766e', // teal-600
    '#115e59', // teal-700
    '#134e4a', // teal-800
    '#2dd4bf', // teal-400
    '#5eead4', // teal-300
    '#99f6e4', // teal-200
  ],
};

const darkTheme = {
  backgroundColor: 'transparent',
  textStyle: {
    color: '#d1d5db', // gray-300
  },
  title: {
    textStyle: {
      color: '#f9fafb', // gray-50
    },
    subtextStyle: {
      color: '#9ca3af', // gray-400
    },
  },
  legend: {
    textStyle: {
      color: '#d1d5db',
    },
  },
  tooltip: {
    backgroundColor: 'rgba(31, 41, 55, 0.95)', // gray-800
    borderColor: '#374151',
    textStyle: {
      color: '#f9fafb',
    },
  },
  axisLine: {
    lineStyle: {
      color: '#4b5563', // gray-600
    },
  },
  splitLine: {
    lineStyle: {
      color: '#374151', // gray-700
    },
  },
  colorPalette: [
    '#2dd4bf', // teal-400
    '#5eead4', // teal-300
    '#14b8a6', // teal-500 alt
    '#0d9488', // teal-500
    '#99f6e4', // teal-200
    '#0f766e', // teal-600
    '#115e59', // teal-700
    '#134e4a', // teal-800
  ],
};

interface EChartsWrapperProps {
  option: EChartsOption;
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  onChartReady?: (chart: EChartsType) => void;
}

export default function EChartsWrapper({
  option,
  className = '',
  style,
  loading = false,
  onChartReady,
}: EChartsWrapperProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<EChartsType | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    // Initial check
    checkTheme();

    // Observe class changes on documentElement
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Initialize chart
  useEffect(() => {
    if (!chartRef.current) return;

    // Dispose existing instance
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    // Create new instance
    chartInstance.current = echarts.init(chartRef.current);

    if (onChartReady) {
      onChartReady(chartInstance.current);
    }

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      chartInstance.current?.resize();
    });
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.current?.dispose();
    };
  }, [onChartReady]);

  // Update chart options with theme
  useEffect(() => {
    if (!chartInstance.current) return;

    const theme = isDark ? darkTheme : lightTheme;

    // Merge theme with option
    const themedOption: EChartsOption = {
      backgroundColor: theme.backgroundColor,
      textStyle: theme.textStyle,
      title: {
        ...(option.title as object),
        textStyle: theme.title.textStyle,
        subtextStyle: theme.title.subtextStyle,
      },
      legend: {
        ...(option.legend as object),
        textStyle: theme.legend.textStyle,
      },
      tooltip: {
        ...(option.tooltip as object),
        backgroundColor: theme.tooltip.backgroundColor,
        borderColor: theme.tooltip.borderColor,
        textStyle: theme.tooltip.textStyle,
      },
      xAxis: option.xAxis
        ? {
            ...(Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis),
            axisLine: theme.axisLine,
            splitLine: theme.splitLine,
            axisLabel: { color: theme.textStyle.color },
          }
        : undefined,
      yAxis: option.yAxis
        ? {
            ...(Array.isArray(option.yAxis) ? option.yAxis[0] : option.yAxis),
            axisLine: theme.axisLine,
            splitLine: theme.splitLine,
            axisLabel: { color: theme.textStyle.color },
          }
        : undefined,
      color: theme.colorPalette,
      ...option,
    };

    chartInstance.current.setOption(themedOption, true);
  }, [option, isDark]);

  // Handle loading state
  useEffect(() => {
    if (!chartInstance.current) return;

    if (loading) {
      chartInstance.current.showLoading({
        text: '',
        color: isDark ? '#2dd4bf' : '#0d9488',
        maskColor: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      });
    } else {
      chartInstance.current.hideLoading();
    }
  }, [loading, isDark]);

  return (
    <div
      ref={chartRef}
      className={className}
      style={{ width: '100%', height: '300px', ...style }}
    />
  );
}
