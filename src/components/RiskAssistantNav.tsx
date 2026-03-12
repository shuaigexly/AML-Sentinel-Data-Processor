'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  {
    segment: '',
    label: 'Dashboard',
    labelZh: '仪表板',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    segment: 'regulations',
    label: 'Regulation Library',
    labelZh: '法规库',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    segment: 'risk-mapping',
    label: 'Risk-Control Mapping',
    labelZh: '风险管控映射',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    segment: 'scenarios',
    label: 'Scenario Review',
    labelZh: '场景评估',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    segment: 'alerts',
    label: 'Alerts & Monitoring',
    labelZh: '警报与监控',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
];

export default function RiskAssistantNav({ locale }: { locale: string }) {
  const pathname = usePathname();
  const isZh = locale === 'zh';

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-24">
        <div className="mb-4 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            {isZh ? '支付风险助手' : 'Payment Risk Tool'}
          </p>
        </div>
        <nav className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const href = `/${locale}/risk-assistant${item.segment ? `/${item.segment}` : ''}`;
            const isActive = item.segment === ''
              ? pathname === `/${locale}/risk-assistant` || pathname === `/${locale}/risk-assistant/`
              : pathname.startsWith(href);

            return (
              <Link
                key={item.segment}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                }`}
              >
                <span className={isActive ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}>
                  {item.icon}
                </span>
                {isZh ? item.labelZh : item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-4 dark:border-gray-700">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {isZh ? '关于此原型' : 'About this prototype'}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-400 dark:text-gray-500">
            {isZh
              ? '面向支付风控场景的个人作品集项目，用于演示风险策略与合规监控工作流。'
              : 'Portfolio prototype demonstrating risk policy mapping and compliance monitoring workflows for payment scenarios.'}
          </p>
        </div>
      </div>
    </aside>
  );
}
