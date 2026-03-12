import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const EMPTY_OVERVIEW = {
  data: {
    summary: {
      totalProjects: 0,
      activeProjects: 0,
      totalWorkpapers: 0,
      pendingReviewWorkpapers: 0,
      totalRisks: 0,
      highRisks: 0,
      averageQcScore: 0,
    },
    distributions: {
      projectStatus: {},
      riskCategory: {},
      testResult: {},
      qcScore: {
        excellent: 0,
        needsImprovement: 0,
        significant: 0,
      },
    },
  },
};

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(EMPTY_OVERVIEW);
    }

    const { prisma } = await import('@/lib/prisma');

    const [
      totalProjects,
      activeProjects,
      totalWorkpapers,
      pendingReviewWorkpapers,
      totalRisks,
      highRisks,
    ] = await Promise.all([
      prisma.auditProject.count(),
      prisma.auditProject.count({
        where: { status: { in: ['planning', 'fieldwork', 'review'] } },
      }),
      prisma.workpaper.count(),
      prisma.workpaper.count({ where: { status: 'pending_review' } }),
      prisma.riskAssessment.count(),
      prisma.riskAssessment.count({
        where: {
          OR: [
            { residualLikelihood: 5 },
            { residualImpact: 5 },
            { AND: [{ residualLikelihood: { gte: 4 } }, { residualImpact: { gte: 3 } }] },
            { AND: [{ residualLikelihood: { gte: 3 } }, { residualImpact: { gte: 4 } }] },
          ],
        },
      }),
    ]);

    const recentAnalyses = await prisma.qcAnalysis.findMany({
      take: 100,
      orderBy: { analysisDate: 'desc' },
      select: { percentage: true },
    });

    const averageQcScore =
      recentAnalyses.length > 0
        ? Math.round(
            recentAnalyses.reduce((sum, analysis) => sum + analysis.percentage, 0) /
              recentAnalyses.length
          )
        : 0;

    const projectsByStatus = await prisma.auditProject.groupBy({
      by: ['status'],
      _count: true,
    });

    const projectStatusDistribution = projectsByStatus.reduce(
      (accumulator, item) => {
        accumulator[item.status] = item._count;
        return accumulator;
      },
      {} as Record<string, number>
    );

    const risksByCategory = await prisma.riskAssessment.groupBy({
      by: ['category'],
      _count: true,
    });

    const riskCategoryDistribution = risksByCategory.reduce(
      (accumulator, item) => {
        accumulator[item.category] = item._count;
        return accumulator;
      },
      {} as Record<string, number>
    );

    const workpapersByResult = await prisma.workpaper.groupBy({
      by: ['testResult'],
      _count: true,
    });

    const testResultDistribution = workpapersByResult.reduce(
      (accumulator, item) => {
        accumulator[item.testResult] = item._count;
        return accumulator;
      },
      {} as Record<string, number>
    );

    const qcScoreRanges = await Promise.all([
      prisma.qcAnalysis.count({ where: { percentage: { gte: 80 } } }),
      prisma.qcAnalysis.count({ where: { percentage: { gte: 60, lt: 80 } } }),
      prisma.qcAnalysis.count({ where: { percentage: { lt: 60 } } }),
    ]);

    return NextResponse.json({
      data: {
        summary: {
          totalProjects,
          activeProjects,
          totalWorkpapers,
          pendingReviewWorkpapers,
          totalRisks,
          highRisks,
          averageQcScore,
        },
        distributions: {
          projectStatus: projectStatusDistribution,
          riskCategory: riskCategoryDistribution,
          testResult: testResultDistribution,
          qcScore: {
            excellent: qcScoreRanges[0],
            needsImprovement: qcScoreRanges[1],
            significant: qcScoreRanges[2],
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
