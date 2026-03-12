'use client';

import { useEffect, useState } from 'react';
import { RiskMatrixChart } from '@/components/charts';
import { StatsCard } from '@/components/dashboard';
import clsx from 'clsx';
import type { Locale } from '@/i18n/config';

interface Risk {
  id: string;
  name: string;
  description: string | null;
  category: string;
  inherentLikelihood: number;
  inherentImpact: number;
  residualLikelihood: number;
  residualImpact: number;
  controlEffectiveness: string;
  mitigationStatus: string;
  owner: { id: string; name: string };
  inherentRiskScore: number;
  residualRiskScore: number;
}

interface RisksDashboardProps {
  locale: Locale;
  messages: {
    dashboard: {
      risksTitle: string;
      noRisks: string;
      riskMatrix: string;
      totalRisks: string;
      highRisks: string;
      mitigated: string;
      pending: string;
      riskName: string;
      category: string;
      inherentRisk: string;
      residualRisk: string;
      controlEffectiveness: string;
      mitigationStatus: string;
    };
  };
}

const categoryLabels: Record<string, string> = {
  financial: 'Financial',
  operational: 'Operational',
  compliance: 'Compliance',
  strategic: 'Strategic',
  technology: 'Technology',
};

const categoryColors: Record<string, string> = {
  financial: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  operational: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  compliance: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  strategic: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  technology: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
};

const effectivenessLabels: Record<string, string> = {
  effective: 'Effective',
  partially_effective: 'Partially Effective',
  ineffective: 'Ineffective',
};

const effectivenessColors: Record<string, string> = {
  effective: 'text-primary-600 dark:text-primary-400',
  partially_effective: 'text-primary-700 dark:text-primary-400',
  ineffective: 'text-primary-700 dark:text-primary-400',
};

const mitigationLabels: Record<string, string> = {
  planned: 'Planned',
  in_progress: 'In Progress',
  completed: 'Completed',
};

const mitigationColors: Record<string, string> = {
  planned: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  in_progress: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  completed: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
};

function getRiskLevel(score: number): { label: string; color: string } {
  if (score >= 15) return { label: 'Critical', color: 'text-primary-700 dark:text-primary-400' };
  if (score >= 10) return { label: 'High', color: 'text-primary-700 dark:text-primary-400' };
  if (score >= 5) return { label: 'Medium', color: 'text-primary-700 dark:text-primary-400' };
  return { label: 'Low', color: 'text-primary-600 dark:text-primary-400' };
}

export default function RisksDashboard({ messages }: RisksDashboardProps) {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRisks = async () => {
      try {
        const res = await fetch('/api/risks?limit=50');
        if (res.ok) {
          const data = await res.json();
          setRisks(data.data);
        }
      } catch (error) {
        console.error('Error fetching risks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRisks();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const totalRisks = risks.length;
  const highRisks = risks.filter((r) => r.residualRiskScore >= 12).length;
  const mitigated = risks.filter((r) => r.mitigationStatus === 'completed').length;
  const pending = risks.filter((r) => r.mitigationStatus !== 'completed').length;

  if (risks.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <p className="text-gray-500 dark:text-gray-400">{messages.dashboard.noRisks}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {messages.dashboard.risksTitle}
      </h2>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={messages.dashboard.totalRisks}
          value={totalRisks}
          variant="default"
        />
        <StatsCard
          title={messages.dashboard.highRisks}
          value={highRisks}
          variant={highRisks > 0 ? 'danger' : 'success'}
        />
        <StatsCard
          title={messages.dashboard.mitigated}
          value={mitigated}
          variant="success"
        />
        <StatsCard
          title={messages.dashboard.pending}
          value={pending}
          variant={pending > 0 ? 'warning' : 'default'}
        />
      </div>

      {/* Risk Matrix */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <RiskMatrixChart
          data={risks.map((r) => ({
            id: r.id,
            name: r.name,
            residualLikelihood: r.residualLikelihood,
            residualImpact: r.residualImpact,
          }))}
          title={messages.dashboard.riskMatrix}
        />
      </div>

      {/* Risk Table */}
      <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {messages.dashboard.riskName}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {messages.dashboard.category}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {messages.dashboard.inherentRisk}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {messages.dashboard.residualRisk}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {messages.dashboard.controlEffectiveness}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {messages.dashboard.mitigationStatus}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {risks.map((risk) => {
                const inherentLevel = getRiskLevel(risk.inherentRiskScore);
                const residualLevel = getRiskLevel(risk.residualRiskScore);

                return (
                  <tr key={risk.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">{risk.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{risk.owner.name}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={clsx('inline-flex rounded-full px-2 py-1 text-xs font-semibold', categoryColors[risk.category])}>
                        {categoryLabels[risk.category] || risk.category}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className={clsx('font-semibold', inherentLevel.color)}>
                        {risk.inherentRiskScore} ({inherentLevel.label})
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        L:{risk.inherentLikelihood} × I:{risk.inherentImpact}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className={clsx('font-semibold', residualLevel.color)}>
                        {risk.residualRiskScore} ({residualLevel.label})
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        L:{risk.residualLikelihood} × I:{risk.residualImpact}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={effectivenessColors[risk.controlEffectiveness]}>
                        {effectivenessLabels[risk.controlEffectiveness] || risk.controlEffectiveness}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={clsx('inline-flex rounded-full px-2 py-1 text-xs font-semibold', mitigationColors[risk.mitigationStatus])}>
                        {mitigationLabels[risk.mitigationStatus] || risk.mitigationStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
