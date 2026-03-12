'use client';

import clsx from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  className = '',
}: StatsCardProps) {
  const variantStyles = {
    default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    primary: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800',
    success: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800',
    warning: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800',
    danger: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800',
  };

  const iconStyles = {
    default: 'text-gray-500 dark:text-gray-400',
    primary: 'text-primary-500 dark:text-primary-400',
    success: 'text-primary-500 dark:text-primary-400',
    warning: 'text-primary-500 dark:text-primary-400',
    danger: 'text-primary-500 dark:text-primary-400',
  };

  return (
    <div
      className={clsx(
        'rounded-lg border p-6 transition-shadow hover:shadow-md',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={clsx(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-primary-600 dark:text-primary-400' : 'text-primary-700 dark:text-primary-400'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">vs last period</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={clsx('flex-shrink-0 text-2xl', iconStyles[variant])}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
