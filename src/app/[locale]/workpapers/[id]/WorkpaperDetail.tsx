'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { CategoryRadarChart } from '@/components/charts';
import type { Locale } from '@/i18n/config';

interface QcAnalysis {
  id: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  rubricBreakdown: Array<{
    category: string;
    score: number;
    maxScore: number;
    findings: string[];
  }>;
  findings: Array<{
    message: string;
    severity: string;
    category: string;
    whyItMatters: string;
  }>;
  suggestions: string[];
  analysisDate: string;
  version: number;
  analyzer: { id: string; name: string };
}

interface Workpaper {
  id: string;
  title: string;
  auditObjective: string;
  riskStatement: string;
  controlDescription: string;
  controlType: string;
  controlFrequency: string;
  populationDescription: string;
  samplingMethod: string;
  sampleSize: number;
  testProcedure: string;
  evidenceCaptured: string;
  testResult: string;
  exceptionDetail: string;
  conclusion: string;
  status: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string; email: string };
  project: { id: string; name: string } | null;
  qcAnalyses: QcAnalysis[];
}

interface WorkpaperDetailProps {
  locale: Locale;
  workpaperId: string;
  messages: {
    workpapers: {
      backToList: string;
      notFound: string;
      details: string;
      qcHistory: string;
      runAnalysis: string;
      analyzing: string;
      version: string;
      analyzedBy: string;
      noAnalyses: string;
    };
    workpaperTool: {
      fields: Record<string, string>;
      results: {
        qualityScore: string;
        rubricBreakdown: string;
        findings: string;
        suggestions: string;
        categories: Record<string, string>;
        severity: Record<string, string>;
      };
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

const severityColors: Record<string, string> = {
  high: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
  medium: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
  low: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
};

export default function WorkpaperDetail({ locale, workpaperId, messages }: WorkpaperDetailProps) {
  const [workpaper, setWorkpaper] = useState<Workpaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<QcAnalysis | null>(null);

  const fetchWorkpaper = useCallback(async () => {
    try {
      const res = await fetch(`/api/workpapers/${workpaperId}`);
      if (res.ok) {
        const { data } = await res.json();
        setWorkpaper(data);
        if (data.qcAnalyses.length > 0) {
          setSelectedAnalysis(data.qcAnalyses[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching workpaper:', error);
    } finally {
      setLoading(false);
    }
  }, [workpaperId]);

  useEffect(() => {
    fetchWorkpaper();
  }, [fetchWorkpaper]);

  const handleRunAnalysis = async () => {
    if (!workpaper) return;

    setAnalyzing(true);
    try {
      const res = await fetch(`/api/workpapers/${workpaperId}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analyzerId: workpaper.author.id }),
      });

      if (res.ok) {
        await fetchWorkpaper();
      }
    } catch (error) {
      console.error('Error running analysis:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getResultLabel = (result: string) => {
    switch (result) {
      case 'pass': return messages.workpaperTool.testResultPass;
      case 'fail': return messages.workpaperTool.testResultFail;
      case 'exception': return messages.workpaperTool.testResultException;
      default: return result;
    }
  };

  const getCategoryLabel = (category: string) =>
    messages.workpaperTool.results.categories[category] || category;

  const getSeverityLabel = (severity: string) =>
    messages.workpaperTool.results.severity[severity] || severity;

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  if (!workpaper) {
    return (
      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-400">{messages.workpapers.notFound}</p>
        <Link
          href={`/${locale}/workpapers`}
          className="mt-4 inline-block text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          ← {messages.workpapers.backToList}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href={`/${locale}/workpapers`}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          ← {messages.workpapers.backToList}
        </Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{workpaper.title}</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {workpaper.author.name} • {new Date(workpaper.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={clsx('rounded-full px-3 py-1 text-sm font-medium', statusColors[workpaper.status])}>
              {statusLabels[workpaper.status]}
            </span>
            <button
              onClick={handleRunAnalysis}
              disabled={analyzing}
              className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 disabled:opacity-50"
            >
              {analyzing ? messages.workpapers.analyzing : messages.workpapers.runAnalysis}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Workpaper Details */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {messages.workpapers.details}
          </h2>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {messages.workpaperTool.fields.auditObjective}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{workpaper.auditObjective}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {messages.workpaperTool.fields.riskStatement}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{workpaper.riskStatement}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {messages.workpaperTool.fields.controlDescription}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{workpaper.controlDescription}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {messages.workpaperTool.fields.controlType}
                  </dt>
                  <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-white">{workpaper.controlType}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {messages.workpaperTool.fields.controlFrequency}
                  </dt>
                  <dd className="mt-1 text-sm capitalize text-gray-900 dark:text-white">{workpaper.controlFrequency}</dd>
                </div>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {messages.workpaperTool.fields.testResult}
                </dt>
                <dd className={clsx('mt-1 text-sm font-medium',
                  workpaper.testResult === 'pass' ? 'text-primary-600 dark:text-primary-400' :
                  workpaper.testResult === 'fail' ? 'text-primary-700 dark:text-primary-400' :
                  'text-primary-700 dark:text-primary-400'
                )}>
                  {getResultLabel(workpaper.testResult)}
                </dd>
              </div>
              {workpaper.exceptionDetail && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {messages.workpaperTool.fields.exceptionDetail}
                  </dt>
                  <dd className="mt-1 whitespace-pre-wrap text-sm text-gray-900 dark:text-white">
                    {workpaper.exceptionDetail}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {messages.workpaperTool.fields.conclusion}
                </dt>
                <dd className="mt-1 whitespace-pre-wrap text-sm text-gray-900 dark:text-white">
                  {workpaper.conclusion}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* QC Analysis */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {messages.workpapers.qcHistory}
          </h2>

          {workpaper.qcAnalyses.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
              <p className="text-gray-500 dark:text-gray-400">{messages.workpapers.noAnalyses}</p>
            </div>
          ) : (
            <>
              {/* Analysis Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {workpaper.qcAnalyses.map((analysis) => (
                  <button
                    key={analysis.id}
                    onClick={() => setSelectedAnalysis(analysis)}
                    className={clsx(
                      'flex-shrink-0 rounded-lg border px-4 py-2 text-sm transition-colors',
                      selectedAnalysis?.id === analysis.id
                        ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                    )}
                  >
                    <div className="font-medium">{analysis.percentage}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      v{analysis.version}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Analysis Details */}
              {selectedAnalysis && (
                <div className="space-y-6">
                  {/* Score */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {messages.workpaperTool.results.qualityScore}
                      </p>
                      <p className={clsx('text-5xl font-bold',
                        selectedAnalysis.percentage >= 80 ? 'text-primary-600 dark:text-primary-400' :
                        selectedAnalysis.percentage >= 60 ? 'text-primary-700 dark:text-primary-400' :
                        'text-primary-700 dark:text-primary-400'
                      )}>
                        {selectedAnalysis.percentage}%
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedAnalysis.totalScore}/{selectedAnalysis.maxScore}
                      </p>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {messages.workpapers.analyzedBy}: {selectedAnalysis.analyzer.name} •{' '}
                        {new Date(selectedAnalysis.analysisDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Radar Chart */}
                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <CategoryRadarChart
                      data={selectedAnalysis.rubricBreakdown.map((r) => ({
                        category: r.category,
                        averageScore: r.score,
                        maxScore: r.maxScore,
                        percentage: Math.round((r.score / r.maxScore) * 100),
                      }))}
                      title=""
                    />
                  </div>

                  {/* Findings */}
                  {selectedAnalysis.findings.length > 0 && (
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                      <h3 className="mb-4 font-medium text-gray-900 dark:text-white">
                        {messages.workpaperTool.results.findings}
                      </h3>
                      <div className="space-y-3">
                        {selectedAnalysis.findings.map((finding, i) => (
                          <div key={i} className="rounded-lg border border-gray-100 p-3 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                              <span className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', severityColors[finding.severity])}>
                                {getSeverityLabel(finding.severity)}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{finding.category}</span>
                            </div>
                            <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{finding.message}</p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{finding.whyItMatters}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {selectedAnalysis.suggestions.length > 0 && (
                    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                      <h3 className="mb-4 font-medium text-gray-900 dark:text-white">
                        {messages.workpaperTool.results.suggestions}
                      </h3>
                      <ul className="space-y-2">
                        {selectedAnalysis.suggestions.map((suggestion, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-primary-500">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
