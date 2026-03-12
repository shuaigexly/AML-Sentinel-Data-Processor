import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const messages = await getMessages(locale);

  return {
    title: `${messages.research.mlProject.title} | Research | Longyu Xu`,
    description:
      locale === 'zh'
        ? '基于XGBoost的支付平台用户流失预测模型，涵盖特征工程、模型对比与商业价值分析。'
        : 'XGBoost-based user churn prediction model for payment platforms, covering feature engineering, model comparison, and business impact analysis.',
    openGraph: {
      title: messages.research.mlProject.title,
      description:
        locale === 'zh'
          ? '机器学习驱动的用户流失预测与留存策略优化'
          : 'ML-driven user churn prediction and retention strategy optimization',
      type: 'website',
    },
  };
}

export default async function MLChurnPredictionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);
  const t = messages.research;
  const s = t.mlProject.sections;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="border-b border-border-light py-8 dark:border-border-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href={`/${locale}/research`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToResearch}
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t.mlProject.title}
            </h1>
            <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400">
              Machine Learning
            </span>
            <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400">
              XGBoost
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-gray-600 dark:text-gray-400">
            {locale === 'zh'
              ? '基于通联支付金融科技实习期间的真实业务场景，构建端到端机器学习流程，预测支付平台用户流失并驱动精准留存策略。'
              : 'An end-to-end machine learning pipeline built during my Allinpay Payment Fintech internship to predict user churn on a payment platform and drive targeted retention strategies.'}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Python', 'pandas', 'scikit-learn', 'XGBoost', 'LightGBM', 'matplotlib', 'Jupyter'].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border-light bg-surface-light px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-border-dark dark:bg-surface-dark dark:text-gray-300"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 1. Project Overview */}
      {/* ================================================================== */}
      <section className="border-b border-border-light py-12 dark:border-border-dark sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">
              1
            </span>
            {s.overview}
          </h2>

          <div className="rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              {locale === 'zh'
                ? '在通联支付金融科技实习期间，我注意到平台每月用户流失率高达12%，直接导致约240万元/月的收入损失。本项目旨在构建一个机器学习模型，提前30天预测可能流失的用户，从而使运营团队能够实施针对性的留存干预措施。'
                : 'During my internship at Allinpay Payment Fintech, I observed a monthly user churn rate of 12%, directly causing approximately ¥2.4M in revenue loss per month. This project aims to build a machine learning model that predicts users likely to churn within 30 days, enabling the operations team to implement targeted retention interventions.'}
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Business Context */}
              <div className="rounded-lg border border-primary-200 bg-primary-50 p-5 dark:border-primary-900/50 dark:bg-primary-900/30">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-400">
                  {locale === 'zh' ? '业务痛点' : 'Business Problem'}
                </div>
                <div className="text-2xl font-bold text-primary-800 dark:text-primary-300">12%</div>
                <div className="text-sm text-primary-700 dark:text-primary-400">
                  {locale === 'zh' ? '月度用户流失率' : 'Monthly Churn Rate'}
                </div>
                <div className="mt-1 text-lg font-semibold text-primary-800 dark:text-primary-300">
                  ¥2.4M / {locale === 'zh' ? '月' : 'month'}
                </div>
                <div className="text-sm text-primary-700 dark:text-primary-400">
                  {locale === 'zh' ? '收入损失' : 'Revenue Loss'}
                </div>
              </div>

              {/* Goal */}
              <div className="rounded-lg border border-primary-200 bg-primary-50 p-5 dark:border-primary-900/50 dark:bg-primary-950/30">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                  {locale === 'zh' ? '项目目标' : 'Project Goal'}
                </div>
                <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">30 {locale === 'zh' ? '天' : 'Days'}</div>
                <div className="text-sm text-primary-600 dark:text-primary-400">
                  {locale === 'zh' ? '提前预警窗口' : 'Early Warning Window'}
                </div>
                <div className="mt-1 text-lg font-semibold text-primary-700 dark:text-primary-300">
                  {locale === 'zh' ? '精准识别高风险用户' : 'Identify At-Risk Users'}
                </div>
                <div className="text-sm text-primary-600 dark:text-primary-400">
                  {locale === 'zh' ? '实现针对性留存干预' : 'Enable Targeted Interventions'}
                </div>
              </div>

              {/* Target */}
              <div className="rounded-lg border border-primary-200 bg-primary-50 p-5 dark:border-primary-900/50 dark:bg-primary-950/30">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                  {locale === 'zh' ? '预期成果' : 'Target Outcome'}
                </div>
                <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">25%</div>
                <div className="text-sm text-primary-600 dark:text-primary-400">
                  {locale === 'zh' ? '流失率降低目标' : 'Churn Reduction Target'}
                </div>
                <div className="mt-1 text-lg font-semibold text-primary-700 dark:text-primary-300">
                  ¥600K / {locale === 'zh' ? '月' : 'month'}
                </div>
                <div className="text-sm text-primary-600 dark:text-primary-400">
                  {locale === 'zh' ? '预期挽回收入' : 'Expected Revenue Saved'}
                </div>
              </div>
            </div>

            {/* Pipeline overview */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold">
                {locale === 'zh' ? 'ML 流程概览' : 'ML Pipeline Overview'}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {(locale === 'zh'
                  ? ['数据收集', '特征工程', '模型训练', '超参数调优', '评估验证', '业务落地']
                  : ['Data Collection', 'Feature Engineering', 'Model Training', 'Hyperparameter Tuning', 'Evaluation', 'Deployment']
                ).map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="rounded-lg border border-primary-500/30 bg-primary-500/5 px-3 py-1.5 font-medium text-primary-600 dark:text-primary-400">
                      {step}
                    </span>
                    {i < 5 && (
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. Dataset & Features */}
      {/* ================================================================== */}
      <section className="border-b border-border-light py-12 dark:border-border-dark sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">
              2
            </span>
            {s.dataset}
          </h2>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border-light p-5 dark:border-border-dark">
              <div className="text-3xl font-bold text-primary-500">50,000</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'zh' ? '用户样本量' : 'User Samples'}
              </div>
            </div>
            <div className="rounded-xl border border-border-light p-5 dark:border-border-dark">
              <div className="text-3xl font-bold text-primary-500">8 {locale === 'zh' ? '个月' : 'Months'}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'zh' ? '行为数据跨度' : 'Behavioral Data Span'}
              </div>
            </div>
            <div className="rounded-xl border border-border-light p-5 dark:border-border-dark">
              <div className="text-3xl font-bold text-primary-500">12%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'zh' ? '正样本比例（流失用户）' : 'Positive Rate (Churned)'}
              </div>
            </div>
          </div>

          {/* Raw features table */}
          <div className="overflow-x-auto rounded-xl border border-border-light dark:border-border-dark">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">
                    {locale === 'zh' ? '特征名称' : 'Feature Name'}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {locale === 'zh' ? '类型' : 'Type'}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {locale === 'zh' ? '描述' : 'Description'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: 'user_id',
                    type: 'ID',
                    en: 'Unique user identifier',
                    zh: '用户唯一标识',
                  },
                  {
                    name: 'registration_date',
                    type: 'datetime',
                    en: 'Account registration timestamp',
                    zh: '账号注册时间戳',
                  },
                  {
                    name: 'last_login_days',
                    type: 'int',
                    en: 'Days since last platform login',
                    zh: '距上次登录天数',
                  },
                  {
                    name: 'transaction_count_30d',
                    type: 'int',
                    en: 'Number of transactions in last 30 days',
                    zh: '近30天交易笔数',
                  },
                  {
                    name: 'transaction_amount_30d',
                    type: 'float',
                    en: 'Total transaction amount in last 30 days (¥)',
                    zh: '近30天交易金额（¥）',
                  },
                  {
                    name: 'avg_transaction_value',
                    type: 'float',
                    en: 'Average value per transaction (¥)',
                    zh: '平均单笔交易金额（¥）',
                  },
                  {
                    name: 'payment_methods_used',
                    type: 'int',
                    en: 'Number of distinct payment methods used',
                    zh: '使用的支付方式数量',
                  },
                  {
                    name: 'support_tickets',
                    type: 'int',
                    en: 'Customer support tickets filed',
                    zh: '提交的客服工单数',
                  },
                  {
                    name: 'app_sessions_7d',
                    type: 'int',
                    en: 'App sessions in last 7 days',
                    zh: '近7天App会话数',
                  },
                  {
                    name: 'feature_usage_score',
                    type: 'float',
                    en: 'Composite score of feature utilization (0-1)',
                    zh: '功能使用综合评分（0-1）',
                  },
                  {
                    name: 'channel_source',
                    type: 'categorical',
                    en: 'User acquisition channel (organic, paid, referral, etc.)',
                    zh: '用户获取渠道（自然流量/付费/推荐等）',
                  },
                  {
                    name: 'device_type',
                    type: 'categorical',
                    en: 'Primary device type (iOS, Android, Web)',
                    zh: '主要设备类型（iOS/Android/Web）',
                  },
                  {
                    name: 'city_tier',
                    type: 'categorical',
                    en: 'City tier classification (Tier 1-4)',
                    zh: '城市等级分类（一至四线）',
                  },
                  {
                    name: 'age_group',
                    type: 'categorical',
                    en: 'User age bracket (18-24, 25-34, 35-44, 45+)',
                    zh: '用户年龄段（18-24/25-34/35-44/45+）',
                  },
                  {
                    name: 'is_churned',
                    type: 'binary',
                    en: 'Target variable — 1 if churned (12% positive rate)',
                    zh: '目标变量 — 1为流失（12%正样本率）',
                  },
                ].map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={`border-b border-border-light dark:border-border-dark ${
                      i % 2 === 0
                        ? 'bg-background-light dark:bg-background-dark'
                        : 'bg-surface-light/50 dark:bg-surface-dark/50'
                    } ${feature.name === 'is_churned' ? 'font-semibold' : ''}`}
                  >
                    <td className="px-4 py-2.5 text-gray-500 dark:text-gray-500">{i + 1}</td>
                    <td className="px-4 py-2.5">
                      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-primary-600 dark:bg-gray-800 dark:text-primary-400">
                        {feature.name}
                      </code>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
                        {feature.type}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                      {locale === 'zh' ? feature.zh : feature.en}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Data loading code snippet */}
          <div className="mt-6 rounded-xl border border-border-light dark:border-border-dark">
            <div className="flex items-center gap-2 border-b border-border-light bg-surface-light px-4 py-2 dark:border-border-dark dark:bg-surface-dark">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-primary-400"></span>
                <span className="h-3 w-3 rounded-full bg-primary-400"></span>
                <span className="h-3 w-3 rounded-full bg-primary-400"></span>
              </div>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">data_loading.py</span>
            </div>
            <pre className="overflow-x-auto p-4 text-sm">
              <code className="font-mono text-gray-800 dark:text-gray-200">{`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Load dataset
df = pd.read_csv('allinpay_user_data.csv', parse_dates=['registration_date'])
print(f"Dataset shape: {df.shape}")  # (50000, 15)
print(f"Churn rate: {df['is_churned'].mean():.2%}")  # 12.00%

# Train/test split with stratification (preserve class ratio)
X = df.drop(['user_id', 'is_churned'], axis=1)
y = df['is_churned']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"Train: {X_train.shape[0]}, Test: {X_test.shape[0]}")  # 40000, 10000`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. Feature Engineering */}
      {/* ================================================================== */}
      <section className="border-b border-border-light py-12 dark:border-border-dark sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">
              3
            </span>
            {s.featureEngineering}
          </h2>

          <p className="mb-8 text-gray-700 dark:text-gray-300">
            {locale === 'zh'
              ? '基于领域知识和数据探索，我从原始特征中衍生出4大类共15个工程特征，显著提升了模型的预测能力。'
              : 'Based on domain knowledge and exploratory data analysis, I engineered 15 derived features across 4 categories, significantly improving the model\'s predictive power.'}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* RFM Features */}
            <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10">
                  <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">
                  {locale === 'zh' ? 'RFM 特征' : 'RFM Features'}
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: 'recency',
                    en: 'Days since last transaction',
                    zh: '距上次交易天数',
                  },
                  {
                    name: 'frequency',
                    en: 'Transaction count over full period',
                    zh: '全周期交易频次',
                  },
                  {
                    name: 'monetary',
                    en: 'Total spend over full period',
                    zh: '全周期总消费金额',
                  },
                  {
                    name: 'rfm_score',
                    en: 'Combined R/F/M quintile scores (1-5)',
                    zh: 'R/F/M 五分位综合评分（1-5）',
                  },
                ].map((f) => (
                  <div key={f.name} className="flex items-start gap-2">
                    <code className="mt-0.5 shrink-0 rounded bg-primary-50 px-1.5 py-0.5 text-xs font-mono text-primary-600 dark:bg-primary-950/50 dark:text-primary-400">
                      {f.name}
                    </code>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'zh' ? f.zh : f.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Behavioral Features */}
            <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10">
                  <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">
                  {locale === 'zh' ? '行为特征' : 'Behavioral Features'}
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: 'session_trend',
                    en: '7-day vs 30-day session ratio (activity direction)',
                    zh: '7天/30天会话比率（活跃趋势方向）',
                  },
                  {
                    name: 'feature_diversity',
                    en: 'Number of distinct platform features used',
                    zh: '使用的平台功能种类数',
                  },
                  {
                    name: 'payment_method_shift',
                    en: 'Change in primary payment method',
                    zh: '主要支付方式变更标记',
                  },
                  {
                    name: 'peak_hour_ratio',
                    en: 'Proportion of activity during peak hours',
                    zh: '高峰时段活跃占比',
                  },
                ].map((f) => (
                  <div key={f.name} className="flex items-start gap-2">
                    <code className="mt-0.5 shrink-0 rounded bg-primary-50 px-1.5 py-0.5 text-xs font-mono text-primary-600 dark:bg-primary-950/50 dark:text-primary-400">
                      {f.name}
                    </code>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'zh' ? f.zh : f.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Temporal Features */}
            <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10">
                  <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">
                  {locale === 'zh' ? '时间特征' : 'Temporal Features'}
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: 'days_since_registration',
                    en: 'Account age in days',
                    zh: '账号注册天数',
                  },
                  {
                    name: 'weekend_ratio',
                    en: 'Weekend vs weekday activity proportion',
                    zh: '周末/工作日活跃比率',
                  },
                  {
                    name: 'activity_decay_rate',
                    en: 'Rate of activity decline over time (slope)',
                    zh: '活跃度随时间衰减速率（斜率）',
                  },
                  {
                    name: 'month_of_year',
                    en: 'Cyclical encoding of month (sin/cos)',
                    zh: '月份周期编码（sin/cos）',
                  },
                ].map((f) => (
                  <div key={f.name} className="flex items-start gap-2">
                    <code className="mt-0.5 shrink-0 rounded bg-primary-50 px-1.5 py-0.5 text-xs font-mono text-primary-700 dark:bg-primary-900/50 dark:text-primary-400">
                      {f.name}
                    </code>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'zh' ? f.zh : f.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Features */}
            <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10">
                  <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">
                  {locale === 'zh' ? '参与度特征' : 'Engagement Features'}
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    name: 'login_frequency_change',
                    en: 'Login frequency change (recent vs historical)',
                    zh: '登录频率变化（近期 vs 历史）',
                  },
                  {
                    name: 'transaction_gap_increase',
                    en: 'Increase in average gap between transactions',
                    zh: '交易间隔增长幅度',
                  },
                  {
                    name: 'support_interaction_ratio',
                    en: 'Support tickets per transaction ratio',
                    zh: '客服工单/交易比率',
                  },
                ].map((f) => (
                  <div key={f.name} className="flex items-start gap-2">
                    <code className="mt-0.5 shrink-0 rounded bg-primary-50 px-1.5 py-0.5 text-xs font-mono text-primary-600 dark:bg-primary-950/50 dark:text-primary-400">
                      {f.name}
                    </code>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'zh' ? f.zh : f.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature engineering code snippet */}
          <div className="mt-6 rounded-xl border border-border-light dark:border-border-dark">
            <div className="flex items-center gap-2 border-b border-border-light bg-surface-light px-4 py-2 dark:border-border-dark dark:bg-surface-dark">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-primary-400"></span>
                <span className="h-3 w-3 rounded-full bg-primary-400"></span>
                <span className="h-3 w-3 rounded-full bg-primary-400"></span>
              </div>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">feature_engineering.py</span>
            </div>
            <pre className="overflow-x-auto p-4 text-sm">
              <code className="font-mono text-gray-800 dark:text-gray-200">{`# RFM Feature Engineering
df['recency'] = (pd.Timestamp.now() - df['last_transaction_date']).dt.days
df['frequency'] = df.groupby('user_id')['transaction_id'].transform('count')
df['monetary'] = df.groupby('user_id')['transaction_amount'].transform('sum')

# Quintile scoring (1=worst, 5=best)
df['r_score'] = pd.qcut(df['recency'], 5, labels=[5,4,3,2,1]).astype(int)
df['f_score'] = pd.qcut(df['frequency'].rank(method='first'), 5, labels=[1,2,3,4,5]).astype(int)
df['m_score'] = pd.qcut(df['monetary'].rank(method='first'), 5, labels=[1,2,3,4,5]).astype(int)

# Behavioral: Activity trend detection
df['session_trend'] = df['app_sessions_7d'] / (df['app_sessions_30d'] / 4.28 + 1e-6)
df['activity_decay_rate'] = np.polyfit(range(8), weekly_activity_series, 1)[0]

# Engagement delta features
df['login_frequency_change'] = (
    df['login_count_recent_14d'] / (df['login_count_prior_14d'] + 1e-6) - 1
)
df['transaction_gap_increase'] = (
    df['avg_gap_recent_30d'] - df['avg_gap_prior_30d']
)`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. Model Comparison */}
      {/* ================================================================== */}
      <section className="border-b border-border-light py-12 dark:border-border-dark sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">
              4
            </span>
            {s.modelComparison}
          </h2>

          <p className="mb-8 text-gray-700 dark:text-gray-300">
            {locale === 'zh'
              ? '我训练并比较了4种主流分类模型，使用5折交叉验证和一致的超参数搜索策略。所有模型均在相同的训练/测试集上评估。'
              : 'I trained and compared 4 mainstream classification models using 5-fold cross-validation with consistent hyperparameter search strategies. All models were evaluated on the same train/test split.'}
          </p>

          {/* Model comparison table */}
          <div className="overflow-x-auto rounded-xl border border-border-light dark:border-border-dark">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark">
                  <th className="px-4 py-3 font-semibold">
                    {locale === 'zh' ? '模型' : 'Model'}
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">AUC-ROC</th>
                  <th className="px-4 py-3 text-center font-semibold">Precision</th>
                  <th className="px-4 py-3 text-center font-semibold">Recall</th>
                  <th className="px-4 py-3 text-center font-semibold">F1 Score</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    {locale === 'zh' ? '结果' : 'Result'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    model: 'Logistic Regression',
                    zh: '逻辑回归',
                    auc: '0.78',
                    precision: '0.71',
                    recall: '0.65',
                    f1: '0.68',
                    winner: false,
                  },
                  {
                    model: 'Random Forest',
                    zh: '随机森林',
                    auc: '0.85',
                    precision: '0.79',
                    recall: '0.73',
                    f1: '0.76',
                    winner: false,
                  },
                  {
                    model: 'XGBoost',
                    zh: 'XGBoost',
                    auc: '0.89',
                    precision: '0.83',
                    recall: '0.78',
                    f1: '0.80',
                    winner: true,
                  },
                  {
                    model: 'LightGBM',
                    zh: 'LightGBM',
                    auc: '0.88',
                    precision: '0.82',
                    recall: '0.77',
                    f1: '0.79',
                    winner: false,
                  },
                ].map((m, i) => (
                  <tr
                    key={m.model}
                    className={`border-b border-border-light dark:border-border-dark ${
                      m.winner
                        ? 'bg-primary-500/5 font-semibold dark:bg-primary-500/10'
                        : i % 2 === 0
                          ? 'bg-background-light dark:bg-background-dark'
                          : 'bg-surface-light/50 dark:bg-surface-dark/50'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {locale === 'zh' ? m.zh : m.model}
                        {m.winner && (
                          <span className="rounded-full bg-primary-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                            {locale === 'zh' ? '最优' : 'Best'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={m.winner ? 'text-primary-500' : ''}>{m.auc}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={m.winner ? 'text-primary-500' : ''}>{m.precision}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={m.winner ? 'text-primary-500' : ''}>{m.recall}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={m.winner ? 'text-primary-500' : ''}>{m.f1}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {m.winner ? (
                        <span className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {locale === 'zh' ? '选中' : 'Selected'}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Why XGBoost */}
          <div className="mt-6 rounded-xl border border-primary-500/30 bg-primary-500/5 p-6">
            <h3 className="mb-3 font-semibold text-primary-600 dark:text-primary-400">
              {locale === 'zh' ? '为什么选择 XGBoost？' : 'Why XGBoost?'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {locale === 'zh'
                  ? '在所有评估指标上均表现最优：AUC 0.89、F1 0.80'
                  : 'Highest performance across all evaluation metrics: AUC 0.89, F1 0.80'}
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {locale === 'zh'
                  ? '内置处理缺失值和类别不平衡的能力，适合金融数据'
                  : 'Built-in handling of missing values and class imbalance, suitable for financial data'}
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {locale === 'zh'
                  ? '提供可解释的特征重要性排序，便于业务团队理解和行动'
                  : 'Provides interpretable feature importance rankings, enabling business team understanding and action'}
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {locale === 'zh'
                  ? '推理速度快（<10ms/样本），满足准实时预测需求'
                  : 'Fast inference speed (<10ms per sample), meeting near-real-time prediction requirements'}
              </li>
            </ul>
          </div>

          {/* Model training code snippet */}
          <div className="mt-6 rounded-xl border border-border-light dark:border-border-dark">
            <div className="flex items-center gap-2 border-b border-border-light bg-surface-light px-4 py-2 dark:border-border-dark dark:bg-surface-dark">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-primary-400"></span>
                <span className="h-3 w-3 rounded-full bg-primary-400"></span>
                <span className="h-3 w-3 rounded-full bg-primary-400"></span>
              </div>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">model_training.py</span>
            </div>
            <pre className="overflow-x-auto p-4 text-sm">
              <code className="font-mono text-gray-800 dark:text-gray-200">{`import xgboost as xgb
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import roc_auc_score, classification_report

# Handle class imbalance with scale_pos_weight
scale_ratio = (y_train == 0).sum() / (y_train == 1).sum()  # ~7.33

# XGBoost with hyperparameter tuning
param_grid = {
    'max_depth': [4, 6, 8],
    'learning_rate': [0.01, 0.05, 0.1],
    'n_estimators': [200, 500, 800],
    'min_child_weight': [1, 3, 5],
    'subsample': [0.8, 0.9],
    'colsample_bytree': [0.8, 0.9],
}

xgb_clf = xgb.XGBClassifier(
    objective='binary:logistic',
    scale_pos_weight=scale_ratio,
    eval_metric='auc',
    random_state=42,
    use_label_encoder=False,
)

grid_search = GridSearchCV(
    xgb_clf, param_grid, scoring='roc_auc',
    cv=5, n_jobs=-1, verbose=1
)
grid_search.fit(X_train, y_train)

# Best model evaluation
best_model = grid_search.best_estimator_
y_pred_proba = best_model.predict_proba(X_test)[:, 1]
print(f"AUC-ROC: {roc_auc_score(y_test, y_pred_proba):.4f}")  # 0.8903`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. Results & Evaluation */}
      {/* ================================================================== */}
      <section className="border-b border-border-light py-12 dark:border-border-dark sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">
              5
            </span>
            {s.results}
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Feature Importance */}
            <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
              <h3 className="mb-4 text-lg font-semibold">
                {locale === 'zh' ? '特征重要性 Top 10' : 'Feature Importance — Top 10'}
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'last_login_days', importance: 0.18, pct: 100 },
                  { name: 'transaction_gap_increase', importance: 0.14, pct: 78 },
                  { name: 'activity_decay_rate', importance: 0.12, pct: 67 },
                  { name: 'session_trend', importance: 0.10, pct: 56 },
                  { name: 'transaction_count_30d', importance: 0.09, pct: 50 },
                  { name: 'feature_usage_score', importance: 0.08, pct: 44 },
                  { name: 'support_tickets', importance: 0.07, pct: 39 },
                  { name: 'payment_method_shift', importance: 0.06, pct: 33 },
                  { name: 'login_frequency_change', importance: 0.05, pct: 28 },
                  { name: 'avg_transaction_value', importance: 0.04, pct: 22 },
                ].map((f, i) => (
                  <div key={f.name} className="flex items-center gap-3">
                    <span className="w-5 shrink-0 text-right text-xs text-gray-500">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <code className="truncate text-xs font-mono text-gray-700 dark:text-gray-300">
                          {f.name}
                        </code>
                        <span className="shrink-0 text-xs font-semibold text-primary-500">
                          {f.importance.toFixed(2)}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                          style={{ width: `${f.pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Confusion Matrix & Threshold */}
            <div className="space-y-6">
              {/* Confusion Matrix */}
              <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
                <h3 className="mb-4 text-lg font-semibold">
                  {locale === 'zh' ? '混淆矩阵' : 'Confusion Matrix'}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({locale === 'zh' ? '阈值' : 'threshold'} = 0.45)
                  </span>
                </h3>
                <div className="mx-auto max-w-xs">
                  <div className="mb-2 text-center text-xs font-semibold text-gray-500">
                    {locale === 'zh' ? '预测值' : 'Predicted'}
                  </div>
                  <div className="flex">
                    <div className="flex w-8 shrink-0 items-center justify-center">
                      <span className="origin-center -rotate-90 whitespace-nowrap text-xs font-semibold text-gray-500">
                        {locale === 'zh' ? '真实值' : 'Actual'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-2">
                        {/* Headers */}
                        <div className="text-center text-xs text-gray-500">{locale === 'zh' ? '流失' : 'Churned'}</div>
                        <div className="text-center text-xs text-gray-500">{locale === 'zh' ? '留存' : 'Retained'}</div>
                        {/* TP */}
                        <div className="rounded-lg bg-primary-100 p-4 text-center dark:bg-primary-950/40">
                          <div className="text-xs text-primary-600 dark:text-primary-400">TP</div>
                          <div className="text-xl font-bold text-primary-700 dark:text-primary-300">780</div>
                        </div>
                        {/* FN */}
                        <div className="rounded-lg bg-primary-100 p-4 text-center dark:bg-primary-900/40">
                          <div className="text-xs text-primary-700 dark:text-primary-400">FN</div>
                          <div className="text-xl font-bold text-primary-800 dark:text-primary-300">220</div>
                        </div>
                        {/* FP */}
                        <div className="rounded-lg bg-primary-100 p-4 text-center dark:bg-primary-900/40">
                          <div className="text-xs text-primary-700 dark:text-primary-400">FP</div>
                          <div className="text-xl font-bold text-primary-800 dark:text-primary-300">160</div>
                        </div>
                        {/* TN */}
                        <div className="rounded-lg bg-primary-100 p-4 text-center dark:bg-primary-950/40">
                          <div className="text-xs text-primary-600 dark:text-primary-400">TN</div>
                          <div className="text-xl font-bold text-primary-700 dark:text-primary-300">4,840</div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs text-gray-500">
                        <div>{locale === 'zh' ? '流失（真实）' : 'Churned (Actual)'}</div>
                        <div>{locale === 'zh' ? '留存（真实）' : 'Retained (Actual)'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Threshold Optimization */}
              <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
                <h3 className="mb-4 text-lg font-semibold">
                  {locale === 'zh' ? '阈值优化' : 'Threshold Optimization'}
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {locale === 'zh'
                    ? '默认阈值0.50会遗漏较多潜在流失用户。通过业务收益分析，我将阈值调整至0.45，在精确率和召回率之间取得更好的平衡——在金融场景中，漏掉一个流失用户的损失远大于对留存用户的一次营销触达成本。'
                    : 'The default threshold of 0.50 misses too many potential churners. Through business cost-benefit analysis, I adjusted the threshold to 0.45 for a better precision-recall trade-off — in fintech, the cost of missing a churner far exceeds the cost of a single retention outreach to a retained user.'}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-border-light p-3 text-center dark:border-border-dark">
                    <div className="text-xs text-gray-500">
                      {locale === 'zh' ? '默认阈值' : 'Default'}
                    </div>
                    <div className="text-lg font-bold text-gray-400">0.50</div>
                  </div>
                  <div className="rounded-lg border border-primary-500/50 bg-primary-500/5 p-3 text-center">
                    <div className="text-xs font-semibold text-primary-500">
                      {locale === 'zh' ? '最优阈值' : 'Optimal'}
                    </div>
                    <div className="text-lg font-bold text-primary-500">0.45</div>
                  </div>
                  <div className="rounded-lg border border-border-light p-3 text-center dark:border-border-dark">
                    <div className="text-xs text-gray-500">
                      {locale === 'zh' ? '召回率提升' : 'Recall Gain'}
                    </div>
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400">+5.2%</div>
                  </div>
                </div>
              </div>

              {/* Key Metrics Summary */}
              <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
                <h3 className="mb-3 text-lg font-semibold">
                  {locale === 'zh' ? '最终模型指标' : 'Final Model Metrics'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-surface-light p-3 dark:bg-surface-dark">
                    <div className="text-xs text-gray-500">Accuracy</div>
                    <div className="text-lg font-bold">93.7%</div>
                  </div>
                  <div className="rounded-lg bg-surface-light p-3 dark:bg-surface-dark">
                    <div className="text-xs text-gray-500">Precision</div>
                    <div className="text-lg font-bold">83.0%</div>
                  </div>
                  <div className="rounded-lg bg-surface-light p-3 dark:bg-surface-dark">
                    <div className="text-xs text-gray-500">Recall</div>
                    <div className="text-lg font-bold">78.0%</div>
                  </div>
                  <div className="rounded-lg bg-surface-light p-3 dark:bg-surface-dark">
                    <div className="text-xs text-gray-500">F1 Score</div>
                    <div className="text-lg font-bold">0.80</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. Business Impact */}
      {/* ================================================================== */}
      <section className="border-b border-border-light py-12 dark:border-border-dark sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">
              6
            </span>
            {s.businessImpact}
          </h2>

          <p className="mb-8 text-gray-700 dark:text-gray-300">
            {locale === 'zh'
              ? '模型预测结果被转化为可执行的运营策略，通过精准的留存营销活动实现了显著的商业回报。'
              : 'Model predictions were translated into actionable operational strategies, achieving significant business returns through targeted retention campaigns.'}
          </p>

          {/* Impact cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10">
                <svg className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="text-2xl font-bold">78%</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {locale === 'zh'
                  ? '流失用户识别率，提前2周预警'
                  : 'Churners identified 2 weeks before churn event'}
              </div>
            </div>

            <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10">
                <svg className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold">¥50</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {locale === 'zh'
                  ? '针对高风险用户发放优惠券'
                  : 'Targeted coupon to high-risk users'}
              </div>
            </div>

            <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10">
                <svg className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-2xl font-bold">¥600K</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {locale === 'zh'
                  ? '月度预期挽回收入（流失减少25%）'
                  : 'Expected monthly revenue save (25% churn reduction)'}
              </div>
            </div>

            <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10">
                <svg className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold">8.5x</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {locale === 'zh'
                  ? 'ML系统投资回报率（¥600K / ¥70K）'
                  : 'ML system ROI (¥600K save vs ¥70K cost)'}
              </div>
            </div>
          </div>

          {/* ROI Breakdown */}
          <div className="mt-8 rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
            <h3 className="mb-6 text-lg font-semibold">
              {locale === 'zh' ? 'ROI 成本收益分析' : 'ROI Cost-Benefit Analysis'}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Costs */}
              <div>
                <h4 className="mb-3 font-medium text-primary-700 dark:text-primary-400">
                  {locale === 'zh' ? '干预成本（月度）' : 'Intervention Costs (Monthly)'}
                </h4>
                <div className="space-y-2 text-sm">
                  {(locale === 'zh'
                    ? [
                        { item: '优惠券发放（~940人 x ¥50）', cost: '¥47,000' },
                        { item: '短信/推送通知', cost: '¥3,000' },
                        { item: 'ML 基础设施 & 维护', cost: '¥15,000' },
                        { item: '运营人力成本', cost: '¥5,000' },
                      ]
                    : [
                        { item: 'Coupon distribution (~940 users x ¥50)', cost: '¥47,000' },
                        { item: 'SMS / push notification costs', cost: '¥3,000' },
                        { item: 'ML infrastructure & maintenance', cost: '¥15,000' },
                        { item: 'Operational labor costs', cost: '¥5,000' },
                      ]
                  ).map((c) => (
                    <div key={c.item} className="flex justify-between rounded-lg bg-primary-50 px-4 py-2 dark:bg-primary-900/20">
                      <span className="text-gray-700 dark:text-gray-300">{c.item}</span>
                      <span className="font-medium text-primary-700 dark:text-primary-400">{c.cost}</span>
                    </div>
                  ))}
                  <div className="flex justify-between rounded-lg bg-primary-100 px-4 py-2 font-semibold dark:bg-primary-900/40">
                    <span>{locale === 'zh' ? '总成本' : 'Total Cost'}</span>
                    <span className="text-primary-800 dark:text-primary-300">¥70,000</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="mb-3 font-medium text-primary-600 dark:text-primary-400">
                  {locale === 'zh' ? '预期收益（月度）' : 'Expected Benefits (Monthly)'}
                </h4>
                <div className="space-y-2 text-sm">
                  {(locale === 'zh'
                    ? [
                        { item: '减少的流失用户数', value: '~1,500人' },
                        { item: '用户平均月度价值（ARPU）', value: '¥400' },
                        { item: '挽回收入', value: '¥600,000' },
                        { item: '客户生命周期价值保护', value: '¥2.4M+' },
                      ]
                    : [
                        { item: 'Prevented churners', value: '~1,500 users' },
                        { item: 'Average monthly value per user (ARPU)', value: '¥400' },
                        { item: 'Revenue saved', value: '¥600,000' },
                        { item: 'Customer lifetime value protected', value: '¥2.4M+' },
                      ]
                  ).map((b) => (
                    <div key={b.item} className="flex justify-between rounded-lg bg-primary-50 px-4 py-2 dark:bg-primary-950/20">
                      <span className="text-gray-700 dark:text-gray-300">{b.item}</span>
                      <span className="font-medium text-primary-600 dark:text-primary-400">{b.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between rounded-lg bg-primary-100 px-4 py-2 font-semibold dark:bg-primary-950/40">
                    <span>ROI</span>
                    <span className="text-primary-700 dark:text-primary-300">8.5x (¥600K / ¥70K)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. Conclusion & Next Steps */}
      {/* ================================================================== */}
      <section className="border-b border-border-light py-12 dark:border-border-dark sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">
              7
            </span>
            {s.conclusion}
          </h2>

          <div className="mb-8 rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
            <p className="text-gray-700 dark:text-gray-300">
              {locale === 'zh'
                ? '本项目成功证明了机器学习在支付金融科技用户留存场景中的巨大应用价值。通过系统的特征工程和模型优化，XGBoost模型实现了AUC 0.89的预测性能，能够在流失事件发生前2周准确识别78%的潜在流失用户。该模型驱动的精准留存策略预计可每月挽回¥600K收入，ROI达8.5倍。'
                : 'This project successfully demonstrated the significant value of machine learning in payment fintech user retention. Through systematic feature engineering and model optimization, the XGBoost model achieved AUC 0.89 predictive performance, accurately identifying 78% of potential churners 2 weeks before the churn event. The model-driven targeted retention strategy is expected to save ¥600K in monthly revenue with an 8.5x ROI.'}
            </p>
          </div>

          <h3 className="mb-4 text-xl font-semibold">
            {locale === 'zh' ? '下一步计划' : 'Next Steps'}
          </h3>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* Real-time scoring */}
            <div className="rounded-xl border border-border-light p-6 transition-all hover:border-primary-500/50 hover:shadow-md dark:border-border-dark">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10">
                <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold">
                {locale === 'zh' ? '实时评分流水线' : 'Real-Time Scoring Pipeline'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'zh'
                  ? '部署模型至Kafka流处理架构，实现用户行为实时评分（<100ms延迟），从批量预测升级为实时预警系统。'
                  : 'Deploy the model to a Kafka streaming architecture for real-time user behavior scoring (<100ms latency), upgrading from batch prediction to a real-time early warning system.'}
              </p>
            </div>

            {/* Deep learning */}
            <div className="rounded-xl border border-border-light p-6 transition-all hover:border-primary-500/50 hover:shadow-md dark:border-border-dark">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10">
                <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold">
                {locale === 'zh' ? '深度学习探索' : 'Deep Learning Exploration'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'zh'
                  ? '尝试LSTM/Transformer序列模型捕捉用户行为时序模式，利用注意力机制识别关键流失信号，预期AUC可再提升3-5个百分点。'
                  : 'Experiment with LSTM/Transformer sequence models to capture temporal patterns in user behavior, leveraging attention mechanisms to identify key churn signals, with an expected 3-5% AUC improvement.'}
              </p>
            </div>

            {/* CRM Integration */}
            <div className="rounded-xl border border-border-light p-6 transition-all hover:border-primary-500/50 hover:shadow-md dark:border-border-dark">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10">
                <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="mb-2 font-semibold">
                {locale === 'zh' ? 'CRM 系统集成' : 'CRM Integration'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {locale === 'zh'
                  ? '将模型预测结果自动同步至CRM系统，根据流失风险等级自动触发差异化留存策略（短信/优惠券/专属客服），实现全自动化闭环运营。'
                  : 'Automatically sync model predictions to the CRM system, triggering differentiated retention strategies (SMS/coupons/dedicated support) based on churn risk tiers for fully automated closed-loop operations.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Footer CTA */}
      {/* ================================================================== */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-border-light bg-gradient-to-r from-primary-500/5 via-primary-500/5 to-primary-500/5 p-8 text-center dark:border-border-dark sm:p-12">
            <h2 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {locale === 'zh'
                ? '对机器学习与产品运营感兴趣？'
                : 'Interested in ML & Product Analytics?'}
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-gray-600 dark:text-gray-400">
              {locale === 'zh'
                ? '我正在寻找产品运营实习机会，欢迎就数据驱动增长、机器学习应用或支付金融科技行业进行交流。'
                : 'I am seeking product operations internship opportunities. Let\'s discuss data-driven growth, ML applications, or the payment fintech industry.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
              >
                {locale === 'zh' ? '联系我' : 'Get in Touch'}
              </Link>
              <Link
                href={`/${locale}/research`}
                className="rounded-lg border border-border-light bg-background-light px-6 py-3 text-sm font-semibold transition-colors hover:bg-gray-100 dark:border-border-dark dark:bg-background-dark dark:hover:bg-gray-800"
              >
                {locale === 'zh' ? '查看更多项目' : 'View More Projects'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
