import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const EMPTY_TRENDS = {
  data: {
    scoreTrend: [],
    categoryAverages: [],
    recentAnalyses: [],
    summary: {
      totalAnalyses: 0,
      averageScore: 0,
      period: { days: 30, startDate: new Date(0).toISOString() },
    },
  },
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const days = parseInt(searchParams.get('days') || '30', 10);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        ...EMPTY_TRENDS,
        data: {
          ...EMPTY_TRENDS.data,
          summary: {
            ...EMPTY_TRENDS.data.summary,
            period: { days, startDate: startDate.toISOString() },
          },
        },
      });
    }

    const { prisma } = await import('@/lib/prisma');

    const analyses = await prisma.qcAnalysis.findMany({
      where: {
        analysisDate: { gte: startDate },
      },
      orderBy: { analysisDate: 'asc' },
      select: {
        id: true,
        percentage: true,
        rubricBreakdown: true,
        analysisDate: true,
        workpaper: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    const trendByDate = analyses.reduce(
      (accumulator, analysis) => {
        const dateKey = analysis.analysisDate.toISOString().split('T')[0];
        if (!accumulator[dateKey]) {
          accumulator[dateKey] = { sum: 0, count: 0 };
        }
        accumulator[dateKey].sum += analysis.percentage;
        accumulator[dateKey].count += 1;
        return accumulator;
      },
      {} as Record<string, { sum: number; count: number }>
    );

    const scoreTrend = Object.entries(trendByDate)
      .map(([date, data]) => ({
        date,
        averageScore: Math.round(data.sum / data.count),
        count: data.count,
      }))
      .sort((left, right) => left.date.localeCompare(right.date));

    const categoryTotals: Record<string, { sum: number; count: number; maxSum: number }> = {};

    for (const analysis of analyses) {
      try {
        const breakdown = JSON.parse(analysis.rubricBreakdown) as Array<{
          category: string;
          score: number;
          maxScore: number;
        }>;

        for (const item of breakdown) {
          if (!categoryTotals[item.category]) {
            categoryTotals[item.category] = { sum: 0, count: 0, maxSum: 0 };
          }
          categoryTotals[item.category].sum += item.score;
          categoryTotals[item.category].maxSum += item.maxScore;
          categoryTotals[item.category].count += 1;
        }
      } catch {
        continue;
      }
    }

    const categoryAverages = Object.entries(categoryTotals).map(([category, data]) => ({
      category,
      averageScore: Math.round(data.sum / data.count),
      maxScore: Math.round(data.maxSum / data.count),
      percentage: Math.round((data.sum / data.maxSum) * 100),
    }));

    const recentAnalyses = analyses.slice(-10).reverse().map((analysis) => ({
      id: analysis.id,
      percentage: analysis.percentage,
      analysisDate: analysis.analysisDate,
      workpaper: analysis.workpaper,
    }));

    return NextResponse.json({
      data: {
        scoreTrend,
        categoryAverages,
        recentAnalyses,
        summary: {
          totalAnalyses: analyses.length,
          averageScore:
            analyses.length > 0
              ? Math.round(analyses.reduce((sum, analysis) => sum + analysis.percentage, 0) / analyses.length)
              : 0,
          period: { days, startDate: startDate.toISOString() },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching trends:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
