'use client';

import { useState } from 'react';
import {
  evaluateWorkpaper,
  calculateSampleSize,
  generateMarkdownWorkpaper,
  exampleWorkpaperData,
  type WorkpaperInput,
  type QcResult,
  type SamplingSuggestion,
} from '@/lib/workpaperQc';

export interface WorkpaperQcToolMessages {
  title: string;
  subtitle: string;
  exampleBtn: string;
  clearBtn: string;
  analyzeBtn: string;
  saveBtn: string;
  saveAndAnalyzeBtn: string;
  saving: string;
  saved: string;
  exportBtn: string;
  copyBtn: string;
  copied: string;
  fields: {
    title: string;
    titleHelp: string;
    auditObjective: string;
    auditObjectiveHelp: string;
    riskStatement: string;
    riskStatementHelp: string;
    controlDescription: string;
    controlDescriptionHelp: string;
    controlType: string;
    controlTypeHelp: string;
    preventive: string;
    detective: string;
    controlFrequency: string;
    controlFrequencyHelp: string;
    daily: string;
    weekly: string;
    monthly: string;
    quarterly: string;
    adHoc: string;
    populationDescription: string;
    populationDescriptionHelp: string;
    samplingMethod: string;
    samplingMethodHelp: string;
    attribute: string;
    judgmental: string;
    random: string;
    sampleSize: string;
    sampleSizeHelp: string;
    testProcedure: string;
    testProcedureHelp: string;
    evidenceCaptured: string;
    evidenceCapturedHelp: string;
    testResult: string;
    testResultHelp: string;
    pass: string;
    fail: string;
    exception: string;
    exceptionDetail: string;
    exceptionDetailHelp: string;
    conclusion: string;
    conclusionHelp: string;
  };
  results: {
    title: string;
    qualityScore: string;
    rubricBreakdown: string;
    findings: string;
    suggestions: string;
    samplingAssistant: string;
    suggestedSampleSize: string;
    populationSize: string;
    confidenceLevel: string;
    tolerableDeviation: string;
    categories: {
      completeness: string;
      traceability: string;
      samplingRationale: string;
      evidenceSufficiency: string;
      conclusionQuality: string;
      professionalTone: string;
    };
    severity: {
      high: string;
      medium: string;
      low: string;
    };
  };
}

interface WorkpaperQcToolProps {
  // Database integration props
  enableSave?: boolean;
  userId?: string;
  projectId?: string;
  onSaveSuccess?: (workpaperId: string) => void;
  messages: WorkpaperQcToolMessages;
}

interface FormDataWithTitle extends WorkpaperInput {
  title: string;
}

const initialFormData: FormDataWithTitle = {
  title: '',
  auditObjective: '',
  riskStatement: '',
  controlDescription: '',
  controlType: 'preventive',
  controlFrequency: 'monthly',
  populationDescription: '',
  samplingMethod: 'random',
  sampleSize: 25,
  testProcedure: '',
  evidenceCaptured: '',
  testResult: 'pass',
  exceptionDetail: '',
  conclusion: '',
};

export default function WorkpaperQcTool({
  messages,
  enableSave = false,
  userId,
  projectId,
  onSaveSuccess,
}: WorkpaperQcToolProps) {
  const [formData, setFormData] = useState<FormDataWithTitle>(initialFormData);
  const [result, setResult] = useState<QcResult | null>(null);
  const [samplingSuggestion, setSamplingSuggestion] = useState<SamplingSuggestion | null>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Sampling assistant state
  const [populationSize, setPopulationSize] = useState<number>(1000);
  const [confidenceLevel, setConfidenceLevel] = useState<90 | 95>(95);
  const [tolerableDeviation, setTolerableDeviation] = useState<number>(5);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'sampleSize' ? parseInt(value) || 0 : value,
    }));
  };

  const handleAnalyze = () => {
    const { title, ...workpaperData } = formData;
    const qcResult = evaluateWorkpaper(workpaperData);
    setResult(qcResult);
  };

  const handleSave = async (analyze: boolean = false) => {
    if (!enableSave || !userId) return;

    setSaving(true);
    try {
      // Save workpaper
      const workpaperRes = await fetch('/api/workpapers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          authorId: userId,
          projectId: projectId || undefined,
          status: 'draft',
        }),
      });

      if (!workpaperRes.ok) {
        throw new Error('Failed to save workpaper');
      }

      const { data: workpaper } = await workpaperRes.json();
      setSavedId(workpaper.id);

      // Optionally run and save QC analysis
      if (analyze) {
        const { title, ...workpaperData } = formData;
        const qcResult = evaluateWorkpaper(workpaperData);
        setResult(qcResult);

        // Save QC analysis
        await fetch(`/api/workpapers/${workpaper.id}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ analyzerId: userId }),
        });
      }

      if (onSaveSuccess) {
        onSaveSuccess(workpaper.id);
      }

      // Reset saved state after 3 seconds
      setTimeout(() => setSavedId(null), 3000);
    } catch (error) {
      console.error('Error saving workpaper:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleLoadExample = () => {
    setFormData({ ...exampleWorkpaperData, title: 'Vendor Payment Dual Approval Testing' });
    setResult(null);
    setSavedId(null);
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setResult(null);
    setSavedId(null);
  };

  const handleCalculateSampling = () => {
    const suggestion = calculateSampleSize(populationSize, confidenceLevel, tolerableDeviation);
    setSamplingSuggestion(suggestion);
  };

  const handleExport = () => {
    if (!result) return;
    const markdown = generateMarkdownWorkpaper(formData, result);
    const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown' }));
    Object.assign(document.createElement('a'), { href: url, download: 'workpaper.md' }).click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!result) return;
    const markdown = generateMarkdownWorkpaper(formData, result);
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryLabel = (category: string): string =>
    messages.results.categories[category as keyof typeof messages.results.categories] || category;

  const getSeverityLabel = (severity: string): string =>
    messages.results.severity[severity as keyof typeof messages.results.severity] || severity;

  const getScoreColor = (percentage: number): string =>
    percentage >= 80 ? 'text-primary-600 dark:text-primary-400' :
    percentage >= 60 ? 'text-primary-700 dark:text-primary-400' :
    'text-primary-700 dark:text-primary-400';

  const severityColors: Record<string, string> = {
    high: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
    medium: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
    low: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
  };
  const getSeverityColor = (severity: string): string =>
    severityColors[severity] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{messages.title}</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{messages.subtitle}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={handleLoadExample}
          className="rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-border-dark dark:bg-surface-dark dark:hover:bg-gray-800"
        >
          {messages.exampleBtn}
        </button>
        <button
          onClick={handleClear}
          className="rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-border-dark dark:bg-surface-dark dark:hover:bg-gray-800"
        >
          {messages.clearBtn}
        </button>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-border-light bg-background-light p-6 dark:border-border-dark dark:bg-background-dark">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Title */}
          {enableSave && (
            <div className="lg:col-span-2">
              <label className="mb-1 block text-sm font-medium">{messages.fields.title}</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
                placeholder={messages.fields.titleHelp}
              />
            </div>
          )}

          {/* Audit Objective */}
          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium">{messages.fields.auditObjective}</label>
            <textarea
              name="auditObjective"
              value={formData.auditObjective}
              onChange={handleInputChange}
              rows={2}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
              placeholder={messages.fields.auditObjectiveHelp}
            />
          </div>

          {/* Risk Statement */}
          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium">{messages.fields.riskStatement}</label>
            <textarea
              name="riskStatement"
              value={formData.riskStatement}
              onChange={handleInputChange}
              rows={2}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
              placeholder={messages.fields.riskStatementHelp}
            />
          </div>

          {/* Control Description */}
          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium">{messages.fields.controlDescription}</label>
            <textarea
              name="controlDescription"
              value={formData.controlDescription}
              onChange={handleInputChange}
              rows={3}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
              placeholder={messages.fields.controlDescriptionHelp}
            />
          </div>

          {/* Control Type */}
          <div>
            <label className="mb-1 block text-sm font-medium">{messages.fields.controlType}</label>
            <select
              name="controlType"
              value={formData.controlType}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
            >
              <option value="preventive">{messages.fields.preventive}</option>
              <option value="detective">{messages.fields.detective}</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">{messages.fields.controlTypeHelp}</p>
          </div>

          {/* Control Frequency */}
          <div>
            <label className="mb-1 block text-sm font-medium">{messages.fields.controlFrequency}</label>
            <select
              name="controlFrequency"
              value={formData.controlFrequency}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
            >
              <option value="daily">{messages.fields.daily}</option>
              <option value="weekly">{messages.fields.weekly}</option>
              <option value="monthly">{messages.fields.monthly}</option>
              <option value="quarterly">{messages.fields.quarterly}</option>
              <option value="adHoc">{messages.fields.adHoc}</option>
            </select>
          </div>

          {/* Population Description */}
          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium">{messages.fields.populationDescription}</label>
            <textarea
              name="populationDescription"
              value={formData.populationDescription}
              onChange={handleInputChange}
              rows={2}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
              placeholder={messages.fields.populationDescriptionHelp}
            />
          </div>

          {/* Sampling Method */}
          <div>
            <label className="mb-1 block text-sm font-medium">{messages.fields.samplingMethod}</label>
            <select
              name="samplingMethod"
              value={formData.samplingMethod}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
            >
              <option value="attribute">{messages.fields.attribute}</option>
              <option value="judgmental">{messages.fields.judgmental}</option>
              <option value="random">{messages.fields.random}</option>
            </select>
          </div>

          {/* Sample Size */}
          <div>
            <label className="mb-1 block text-sm font-medium">{messages.fields.sampleSize}</label>
            <input
              type="number"
              name="sampleSize"
              value={formData.sampleSize}
              onChange={handleInputChange}
              min={1}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
            />
          </div>

          {/* Test Procedure */}
          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium">{messages.fields.testProcedure}</label>
            <textarea
              name="testProcedure"
              value={formData.testProcedure}
              onChange={handleInputChange}
              rows={5}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
              placeholder={messages.fields.testProcedureHelp}
            />
          </div>

          {/* Evidence Captured */}
          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium">{messages.fields.evidenceCaptured}</label>
            <textarea
              name="evidenceCaptured"
              value={formData.evidenceCaptured}
              onChange={handleInputChange}
              rows={3}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
              placeholder={messages.fields.evidenceCapturedHelp}
            />
          </div>

          {/* Test Result */}
          <div>
            <label className="mb-1 block text-sm font-medium">{messages.fields.testResult}</label>
            <select
              name="testResult"
              value={formData.testResult}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
            >
              <option value="pass">{messages.fields.pass}</option>
              <option value="fail">{messages.fields.fail}</option>
              <option value="exception">{messages.fields.exception}</option>
            </select>
          </div>

          {/* Exception Detail */}
          <div>
            <label className="mb-1 block text-sm font-medium">{messages.fields.exceptionDetail}</label>
            <textarea
              name="exceptionDetail"
              value={formData.exceptionDetail}
              onChange={handleInputChange}
              rows={2}
              disabled={formData.testResult === 'pass'}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:opacity-50 dark:border-border-dark dark:bg-surface-dark"
              placeholder={messages.fields.exceptionDetailHelp}
            />
          </div>

          {/* Conclusion */}
          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium">{messages.fields.conclusion}</label>
            <textarea
              name="conclusion"
              value={formData.conclusion}
              onChange={handleInputChange}
              rows={5}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
              placeholder={messages.fields.conclusionHelp}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={handleAnalyze}
            className="rounded-lg bg-primary-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
          >
            {messages.analyzeBtn}
          </button>
          {enableSave && userId && (
            <>
              <button
                onClick={() => handleSave(false)}
                disabled={saving || !formData.title}
                className="rounded-lg border border-primary-500 px-6 py-3 text-sm font-semibold text-primary-500 transition-colors hover:bg-primary-500/10 disabled:opacity-50"
              >
                {saving ? messages.saving : savedId ? messages.saved : messages.saveBtn}
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving || !formData.title}
                className="rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
              >
                {saving ? messages.saving : messages.saveAndAnalyzeBtn}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sampling Assistant */}
      <div className="rounded-xl border border-border-light bg-background-light p-6 dark:border-border-dark dark:bg-background-dark">
        <h3 className="mb-4 text-lg font-semibold">{messages.results.samplingAssistant}</h3>
        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium">{messages.results.populationSize}</label>
            <input
              type="number"
              value={populationSize}
              onChange={(e) => setPopulationSize(parseInt(e.target.value) || 0)}
              min={1}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{messages.results.confidenceLevel}</label>
            <select
              value={confidenceLevel}
              onChange={(e) => setConfidenceLevel(parseInt(e.target.value) as 90 | 95)}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
            >
              <option value={90}>90%</option>
              <option value={95}>95%</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{messages.results.tolerableDeviation}</label>
            <select
              value={tolerableDeviation}
              onChange={(e) => setTolerableDeviation(parseInt(e.target.value))}
              className="w-full rounded-lg border border-border-light bg-surface-light px-4 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark"
            >
              <option value={5}>5%</option>
              <option value={7}>7%</option>
              <option value={10}>10%</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCalculateSampling}
              className="w-full rounded-lg border border-primary-500 px-4 py-2 text-sm font-medium text-primary-500 transition-colors hover:bg-primary-500/10"
            >
              {messages.results.suggestedSampleSize}
            </button>
          </div>
        </div>
        {samplingSuggestion && (
          <div className="mt-4 rounded-lg bg-primary-500/10 p-4">
            <p className="text-sm">
              <span className="font-semibold">{messages.results.suggestedSampleSize}:</span>{' '}
              <span className="text-lg font-bold text-primary-500">{samplingSuggestion.suggestedSampleSize}</span>
            </p>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{samplingSuggestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border-light bg-background-light p-6 dark:border-border-dark dark:bg-background-dark">
            <h3 className="mb-4 text-lg font-semibold">{messages.results.title}</h3>

            {/* Quality Score */}
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">{messages.results.qualityScore}</p>
              <p className={`text-5xl font-bold ${getScoreColor(result.percentage)}`}>
                {result.percentage}%
              </p>
              <p className="text-sm text-gray-500">
                {result.totalScore}/{result.maxScore}
              </p>
            </div>

            {/* Rubric Breakdown */}
            <div className="mb-6">
              <h4 className="mb-3 text-sm font-semibold">{messages.results.rubricBreakdown}</h4>
              <div className="space-y-2">
                {result.rubricBreakdown.map((rubric) => (
                  <div key={rubric.category}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>{getCategoryLabel(rubric.category)}</span>
                      <span className="font-medium">
                        {rubric.score}/{rubric.maxScore}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full rounded-full bg-primary-500 transition-all"
                        style={{ width: `${(rubric.score / rubric.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Findings */}
            {result.findings.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-semibold">{messages.results.findings}</h4>
                <div className="space-y-3">
                  {result.findings.map((finding, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border-light p-4 dark:border-border-dark"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${getSeverityColor(finding.severity)}`}
                        >
                          {getSeverityLabel(finding.severity)}
                        </span>
                        <span className="text-xs text-gray-500">{finding.category}</span>
                      </div>
                      <p className="text-sm font-medium">{finding.message}</p>
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        {finding.whyItMatters}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-semibold">{messages.results.suggestions}</h4>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex gap-2 text-sm">
                      <span className="text-primary-500">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Export Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleExport}
                className="rounded-lg bg-primary-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
              >
                {messages.exportBtn}
              </button>
              <button
                onClick={handleCopy}
                className="rounded-lg border border-primary-500 px-6 py-2 text-sm font-medium text-primary-500 transition-colors hover:bg-primary-500/10"
              >
                {copied ? messages.copied : messages.copyBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
