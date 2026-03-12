'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import type { Locale } from '@/i18n/config';

interface Workpaper {
  id: string;
  title: string;
  status: string;
  testResult: string;
  controlType: string;
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string };
  project: { id: string; name: string } | null;
  qcAnalyses: Array<{ id: string; percentage: number; analysisDate: string }>;
}

interface WorkpapersListProps {
  locale: Locale;
  messages: {
    workpapers: {
      title: string;
      newWorkpaper: string;
      noWorkpapers: string;
      filterByStatus: string;
      filterByResult: string;
      all: string;
      columns: {
        title: string;
        project: string;
        status: string;
        testResult: string;
        qcScore: string;
        lastUpdated: string;
      };
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

export default function WorkpapersList({ locale, messages }: WorkpapersListProps) {
  const [workpapers, setWorkpapers] = useState<Workpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [resultFilter, setResultFilter] = useState<string>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchWorkpapers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), limit: '10' });
        if (statusFilter) params.set('status', statusFilter);
        if (resultFilter) params.set('testResult', resultFilter);

        const res = await fetch(`/api/workpapers?${params}`);
        if (res.ok) {
          const data = await res.json();
          setWorkpapers(data.data);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (error) {
        console.error('Error fetching workpapers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkpapers();
  }, [page, statusFilter, resultFilter]);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {messages.workpapers.title}
        </h1>
        <Link
          href={`/${locale}/workpapers/new`}
          className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
        >
          + {messages.workpapers.newWorkpaper}
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">
            {messages.workpapers.filterByStatus}
          </label>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="">{messages.workpapers.all}</option>
            <option value="draft">Draft</option>
            <option value="pending_review">Pending Review</option>
            <option value="reviewed">Reviewed</option>
            <option value="approved">Approved</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">
            {messages.workpapers.filterByResult}
          </label>
          <select
            value={resultFilter}
            onChange={(e) => { setResultFilter(e.target.value); setPage(1); }}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="">{messages.workpapers.all}</option>
            <option value="pass">{messages.workpaperTool.testResultPass}</option>
            <option value="fail">{messages.workpaperTool.testResultFail}</option>
            <option value="exception">{messages.workpaperTool.testResultException}</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
        </div>
      ) : workpapers.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-gray-500 dark:text-gray-400">
          {messages.workpapers.noWorkpapers}
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {messages.workpapers.columns.title}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {messages.workpapers.columns.project}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {messages.workpapers.columns.status}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {messages.workpapers.columns.testResult}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {messages.workpapers.columns.qcScore}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {messages.workpapers.columns.lastUpdated}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                {workpapers.map((wp) => (
                  <tr key={wp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {wp.project?.name || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx('inline-flex rounded-full px-2 py-1 text-xs font-semibold', statusColors[wp.status])}>
                        {statusLabels[wp.status] || wp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx('font-medium', resultColors[wp.testResult])}>
                        {getResultLabel(wp.testResult)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {wp.qcAnalyses[0] ? (
                        <span className={clsx('font-semibold',
                          wp.qcAnalyses[0].percentage >= 80 ? 'text-primary-600 dark:text-primary-400' :
                          wp.qcAnalyses[0].percentage >= 60 ? 'text-primary-700 dark:text-primary-400' :
                          'text-primary-700 dark:text-primary-400'
                        )}>
                          {wp.qcAnalyses[0].percentage}%
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(wp.updatedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-gray-600"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-50 dark:border-gray-600"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
