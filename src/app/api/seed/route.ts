import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { exampleWorkpaperData } from '@/lib/workpaperQc';

// POST /api/seed - Seed demo data
export async function POST() {
  try {
    // Create demo user
    const user = await prisma.user.upsert({
      where: { email: 'demo@example.com' },
      update: {},
      create: {
        email: 'demo@example.com',
        name: 'Demo Auditor',
        role: 'senior_auditor',
      },
    });

    // Create demo project
    const project = await prisma.auditProject.upsert({
      where: { id: 'demo-project' },
      update: {},
      create: {
        id: 'demo-project',
        name: 'Q1 2025 Financial Audit',
        description: 'Annual financial audit covering payment controls, revenue recognition, and expense management.',
        status: 'fieldwork',
        priority: 'high',
        startDate: new Date('2025-01-15'),
        endDate: new Date('2025-03-31'),
        ownerId: user.id,
      },
    });

    // Create milestones
    const milestones = [
      { name: 'Planning Complete', status: 'completed', dueDate: '2025-01-20' },
      { name: 'Fieldwork 50%', status: 'completed', dueDate: '2025-02-15' },
      { name: 'Fieldwork Complete', status: 'in_progress', dueDate: '2025-03-01' },
      { name: 'Draft Report', status: 'pending', dueDate: '2025-03-15' },
      { name: 'Final Report', status: 'pending', dueDate: '2025-03-31' },
    ];

    for (const ms of milestones) {
      await prisma.projectMilestone.upsert({
        where: { id: `${project.id}-${ms.name.replace(/\s+/g, '-').toLowerCase()}` },
        update: { status: ms.status },
        create: {
          id: `${project.id}-${ms.name.replace(/\s+/g, '-').toLowerCase()}`,
          name: ms.name,
          status: ms.status,
          dueDate: new Date(ms.dueDate),
          completedAt: ms.status === 'completed' ? new Date() : null,
          projectId: project.id,
        },
      });
    }

    // Create demo workpaper from example data
    const workpaper = await prisma.workpaper.upsert({
      where: { id: 'demo-workpaper-1' },
      update: {},
      create: {
        id: 'demo-workpaper-1',
        title: 'Vendor Payment Dual Approval Testing',
        ...exampleWorkpaperData,
        status: 'reviewed',
        projectId: project.id,
        authorId: user.id,
      },
    });

    // Create additional sample workpapers
    const sampleWorkpapers = [
      {
        id: 'demo-workpaper-2',
        title: 'Revenue Recognition Testing',
        auditObjective: 'To verify that revenue is recognized in the correct period according to ASC 606 guidelines.',
        riskStatement: 'Revenue may be recorded in incorrect periods, leading to misstated financial statements.',
        controlDescription: 'The Finance team reviews all contracts over $50,000 before revenue recognition to ensure performance obligations are met.',
        controlType: 'detective',
        controlFrequency: 'monthly',
        populationDescription: 'All revenue transactions over $50,000 recorded in Q4 2024. Total population: 234 transactions.',
        samplingMethod: 'random',
        sampleSize: 30,
        testProcedure: '1. Obtain revenue register for Q4 2024.\n2. Select 30 transactions randomly.\n3. Verify contract terms and performance obligations.\n4. Confirm revenue recognition date aligns with delivery.',
        evidenceCaptured: 'Contract copies, delivery confirmations, and revenue register stored in SharePoint: /Audit/2025/Q1/Revenue/',
        testResult: 'pass',
        exceptionDetail: '',
        conclusion: 'Based on testing, revenue recognition controls are operating effectively. All 30 sampled transactions were properly recorded in the correct period.',
        status: 'approved',
      },
      {
        id: 'demo-workpaper-3',
        title: 'Access Control Review - ERP System',
        auditObjective: 'To verify that access to the ERP system is appropriately restricted based on job responsibilities.',
        riskStatement: 'Unauthorized users may gain access to sensitive financial data or perform unauthorized transactions.',
        controlDescription: 'IT Security reviews and approves all ERP access requests. Quarterly access reviews are performed by department managers.',
        controlType: 'preventive',
        controlFrequency: 'quarterly',
        populationDescription: 'All active ERP user accounts as of Q1 2025. Total population: 187 accounts.',
        samplingMethod: 'judgmental',
        sampleSize: 25,
        testProcedure: '1. Obtain active user list from IT.\n2. Select 25 accounts for review.\n3. Verify access levels match job responsibilities.\n4. Confirm terminated employees removed within 5 business days.',
        evidenceCaptured: 'User access reports, HR termination records stored in SharePoint: /Audit/2025/Q1/AccessControl/',
        testResult: 'exception',
        exceptionDetail: '2 of 25 accounts had excess privileges. Both accounts belonged to transferred employees whose access was not updated within 5 business days.',
        conclusion: 'Access control process has exceptions. Management should review and strengthen the access request/revocation process.',
        status: 'reviewed',
      },
    ];

    for (const wp of sampleWorkpapers) {
      await prisma.workpaper.upsert({
        where: { id: wp.id },
        update: {},
        create: {
          ...wp,
          projectId: project.id,
          authorId: user.id,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Demo data seeded successfully',
      data: {
        userId: user.id,
        projectId: project.id,
        workpaperId: workpaper.id,
        sampleWorkpapers: sampleWorkpapers.length,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to seed data' });
}
