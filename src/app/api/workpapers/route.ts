import { NextRequest, NextResponse } from 'next/server';
import { createWorkpaperSchema, workpaperQuerySchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// GET /api/workpapers - List workpapers with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams = {
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
      status: searchParams.get('status') || undefined,
      projectId: searchParams.get('projectId') || undefined,
      authorId: searchParams.get('authorId') || undefined,
      testResult: searchParams.get('testResult') || undefined,
    };

    const query = workpaperQuerySchema.parse(queryParams);
    const skip = (query.page - 1) * query.limit;

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        data: [],
        pagination: {
          page: query.page,
          limit: query.limit,
          total: 0,
          totalPages: 0,
        },
      });
    }

    const { prisma } = await import('@/lib/prisma');

    // Build where clause
    const where: Record<string, unknown> = {};
    if (query.status) where.status = query.status;
    if (query.projectId) where.projectId = query.projectId;
    if (query.authorId) where.authorId = query.authorId;
    if (query.testResult) where.testResult = query.testResult;

    // Execute query with count
    const [workpapers, total] = await Promise.all([
      prisma.workpaper.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          author: { select: { id: true, name: true, email: true } },
          project: { select: { id: true, name: true } },
          qcAnalyses: {
            take: 1,
            orderBy: { analysisDate: 'desc' },
            select: { id: true, percentage: true, analysisDate: true },
          },
        },
      }),
      prisma.workpaper.count({ where }),
    ]);

    return NextResponse.json({
      data: workpapers,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    });
  } catch (error) {
    console.error('Error fetching workpapers:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/workpapers - Create a new workpaper
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createWorkpaperSchema.parse(body);

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
    }

    const { prisma } = await import('@/lib/prisma');

    const workpaper = await prisma.workpaper.create({
      data: {
        title: data.title,
        auditObjective: data.auditObjective,
        riskStatement: data.riskStatement,
        controlDescription: data.controlDescription,
        controlType: data.controlType,
        controlFrequency: data.controlFrequency,
        populationDescription: data.populationDescription,
        samplingMethod: data.samplingMethod,
        sampleSize: data.sampleSize,
        testProcedure: data.testProcedure,
        evidenceCaptured: data.evidenceCaptured,
        testResult: data.testResult,
        exceptionDetail: data.exceptionDetail || '',
        conclusion: data.conclusion,
        status: data.status || 'draft',
        projectId: data.projectId || null,
        authorId: data.authorId,
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ data: workpaper }, { status: 201 });
  } catch (error) {
    console.error('Error creating workpaper:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid workpaper data', details: error }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
