'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QcScoreTrendChart, CategoryRadarChart } from '@/components/charts';
import type { Locale } from '@/i18n/config';

interface Workpaper {
  id: string;
  title: string;
  status: string;
  testResult: string;
  createdAt: string;
  author: { id: string; name: string };
  qcAnalyses: Array<{ percentage: number; analysisDate: string }>;
}

interface TrendsData {
  scoreTrend: Array<{ date: string; averageScore: number; count: number }>;
  categoryAverages: Array<{
    category: string;
    averageScore: number;
    maxScore: number;
    percentage: number;
  }>;
  recentAnalyses: Array<{
    id: string;
    percentage: number;
    analysisDate: string;
    workpaper: { id: string; title: string };
  }>;
}

interface WorkpapersAnalysisProps {
  locale: Locale;
  messages: {
    dashboard: {
      workpapersTitle: string;
      recentWorkpapers: string;
      qcTrend: string;
      categoryAnalysis: string;
      viewAll: string;
      noWorkpapers: string;
      status: string;
      testResult: string;
      score: string;
      date: string;
    };
    workpaperTool: {
      testResultPass: string;
      testResultFail: string;
      testResultException: string;
    };
  };
}

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  pending_review: 'Pending Review',
  reviewed: 'Reviewed',
  approved: 'Approved',
};

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  pending_review: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  reviewed: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  approved: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
};

const resultColors: Record<string, string> = {
  pass: 'text-primary-600 dark:text-primary-400',
  fail: 'text-primary-700 dark:text-primary-400',
  exception: 'text-primary-700 dark:text-primary-400',
};

export default function WorkpapersAnalysis({ locale, messages }: WorkpapersAnalysisProps) {
  const [workpapers, setWorkpapers] = useState<Workpaper[]>([]);
  const [trends, setTrends] = useState<TrendsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workpapersRes, trendsRes] = await Promise.all([
          fetch('/api/workpapers?limit=10'),
          fetch('/api/dashboard/trends?days=30'),
        ]);

        if (workpapersRes.ok) {
          const data = await workpapersRes.json();
          setWorkpapers(data.data);
        }

        if (trendsRes.ok) {
          const data = await trendsRes.json();
          setTrends(data.data);
        }
      } catch (error) {
        console.error('Error fetching workpapers data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getResultLabel = (result: string) => {
    switch (result) {
      case 'pass':
        return messages.workpaperTool.testResultPass;
      case 'fail':
        return messages.workpaperTool.testResultFail;
      case 'exception':
        return messages.workpaperTool.testResultException;
      default:
        return result;
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {messages.dashboard.workpapersTitle}
        </h2>
        <Link
          href={`/${locale}/workpapers`}
          className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          {messages.dashboard.viewAll} →
        </Link>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <QcScoreTrendChart
            data={trends?.scoreTrend || []}
            title={messages.dashboard.qcTrend}
            loading={!trends}
          />
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <CategoryRadarChart
            data={trends?.categoryAverages || []}
            title={messages.dashboard.categoryAnalysis}
            loading={!trends}
          />
        </div>
      </div>

      {/* Recent Workpapers Table */}
      <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {messages.dashboard.recentWorkpapers}
          </h3>
        </div>

        {workpapers.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-gray-500 dark:text-gray-400">
            {messages.dashboard.noWorkpapers}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {messages.dashboard.status}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {messages.dashboard.testResult}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {messages.dashboard.score}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {messages.dashboard.date}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {workpapers.map((wp) => (
                  <tr key={wp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        href={`/${locale}/workpapers/${wp.id}`}
                        className="font-medium text-gray-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
                      >
                        {wp.title}
                      </Link>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {wp.author.name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusColors[wp.status]}`}>
                        {statusLabels[wp.status] || wp.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`font-medium ${resultColors[wp.testResult]}`}>
                        {getResultLabel(wp.testResult)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {wp.qcAnalyses[0] ? (
                        <span className={`font-semibold ${
                          wp.qcAnalyses[0].percentage >= 80
                            ? 'text-primary-600 dark:text-primary-400'
                            : wp.qcAnalyses[0].percentage >= 60
                            ? 'text-primary-700 dark:text-primary-400'
                            : 'text-primary-700 dark:text-primary-400'
                        }`}>
                          {wp.qcAnalyses[0].percentage}%
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(wp.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
