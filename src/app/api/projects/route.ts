import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createProjectSchema, projectQuerySchema } from '@/lib/validations';

// GET /api/projects - List projects with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams = {
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
      status: searchParams.get('status') || undefined,
      priority: searchParams.get('priority') || undefined,
      ownerId: searchParams.get('ownerId') || undefined,
    };

    const query = projectQuerySchema.parse(queryParams);
    const skip = (query.page - 1) * query.limit;

    // Build where clause
    const where: Record<string, unknown> = {};
    if (query.status) where.status = query.status;
    if (query.priority) where.priority = query.priority;
    if (query.ownerId) where.ownerId = query.ownerId;

    // Execute query with count
    const [projects, total] = await Promise.all([
      prisma.auditProject.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          owner: { select: { id: true, name: true, email: true } },
          _count: {
            select: {
              workpapers: true,
              milestones: true,
              risks: true,
            },
          },
        },
      }),
      prisma.auditProject.count({ where }),
    ]);

    return NextResponse.json({
      data: projects,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createProjectSchema.parse(body);

    const project = await prisma.auditProject.create({
      data: {
        name: data.name,
        description: data.description || null,
        status: data.status,
        priority: data.priority,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        ownerId: data.ownerId,
      },
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ data: project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid project data', details: error }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
