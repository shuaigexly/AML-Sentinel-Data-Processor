import { z } from 'zod';

// ===========================================
// Common Enums
// ===========================================
export const ControlTypeEnum = z.enum(['preventive', 'detective']);
export const ControlFrequencyEnum = z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'adHoc']);
export const SamplingMethodEnum = z.enum(['attribute', 'judgmental', 'random']);
export const TestResultEnum = z.enum(['pass', 'fail', 'exception']);
export const WorkpaperStatusEnum = z.enum(['draft', 'pending_review', 'reviewed', 'approved']);
export const ProjectStatusEnum = z.enum(['planning', 'fieldwork', 'review', 'reporting', 'completed']);
export const PriorityEnum = z.enum(['low', 'medium', 'high', 'critical']);
export const MilestoneStatusEnum = z.enum(['pending', 'in_progress', 'completed', 'overdue']);
export const RiskCategoryEnum = z.enum(['financial', 'operational', 'compliance', 'strategic', 'technology']);
export const ControlEffectivenessEnum = z.enum(['effective', 'partially_effective', 'ineffective']);
export const MitigationStatusEnum = z.enum(['planned', 'in_progress', 'completed']);

// ===========================================
// User Schema
// ===========================================
export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['admin', 'senior_auditor', 'auditor']).default('auditor'),
});

// ===========================================
// Workpaper Schemas
// ===========================================
export const createWorkpaperSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  auditObjective: z.string().min(20, 'Audit objective must be at least 20 characters'),
  riskStatement: z.string().min(20, 'Risk statement must be at least 20 characters'),
  controlDescription: z.string().min(30, 'Control description must be at least 30 characters'),
  controlType: ControlTypeEnum,
  controlFrequency: ControlFrequencyEnum,
  populationDescription: z.string().min(20, 'Population description must be at least 20 characters'),
  samplingMethod: SamplingMethodEnum,
  sampleSize: z.number().int().positive('Sample size must be a positive integer'),
  testProcedure: z.string().min(50, 'Test procedure must be at least 50 characters'),
  evidenceCaptured: z.string().min(20, 'Evidence captured must be at least 20 characters'),
  testResult: TestResultEnum,
  exceptionDetail: z.string().default(''),
  conclusion: z.string().min(30, 'Conclusion must be at least 30 characters'),
  projectId: z.string().optional(),
  authorId: z.string(),
  status: WorkpaperStatusEnum.default('draft'),
});

export const updateWorkpaperSchema = createWorkpaperSchema.partial().omit({ authorId: true });

export const workpaperQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  status: WorkpaperStatusEnum.optional(),
  projectId: z.string().optional(),
  authorId: z.string().optional(),
  testResult: TestResultEnum.optional(),
});

// ===========================================
// Project Schemas
// ===========================================
export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  status: ProjectStatusEnum.default('planning'),
  priority: PriorityEnum.default('medium'),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
  ownerId: z.string(),
});

export const updateProjectSchema = createProjectSchema.partial().omit({ ownerId: true });

export const projectQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  status: ProjectStatusEnum.optional(),
  priority: PriorityEnum.optional(),
  ownerId: z.string().optional(),
});

// ===========================================
// Milestone Schemas
// ===========================================
export const createMilestoneSchema = z.object({
  name: z.string().min(1, 'Milestone name is required'),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional().nullable(),
  status: MilestoneStatusEnum.default('pending'),
  projectId: z.string(),
});

export const updateMilestoneSchema = createMilestoneSchema.partial().omit({ projectId: true });

// ===========================================
// Risk Assessment Schemas
// ===========================================
export const createRiskSchema = z.object({
  name: z.string().min(1, 'Risk name is required'),
  description: z.string().optional(),
  category: RiskCategoryEnum,
  inherentLikelihood: z.number().int().min(1).max(5),
  inherentImpact: z.number().int().min(1).max(5),
  controlEffectiveness: ControlEffectivenessEnum.default('effective'),
  residualLikelihood: z.number().int().min(1).max(5),
  residualImpact: z.number().int().min(1).max(5),
  mitigationPlan: z.string().optional(),
  mitigationStatus: MitigationStatusEnum.default('planned'),
  projectId: z.string().optional(),
  ownerId: z.string(),
});

export const updateRiskSchema = createRiskSchema.partial().omit({ ownerId: true });

export const riskQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  category: RiskCategoryEnum.optional(),
  projectId: z.string().optional(),
  ownerId: z.string().optional(),
});

// ===========================================
// Type Exports
// ===========================================
export type CreateWorkpaperInput = z.infer<typeof createWorkpaperSchema>;
export type UpdateWorkpaperInput = z.infer<typeof updateWorkpaperSchema>;
export type WorkpaperQuery = z.infer<typeof workpaperQuerySchema>;

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectQuery = z.infer<typeof projectQuerySchema>;

export type CreateMilestoneInput = z.infer<typeof createMilestoneSchema>;
export type UpdateMilestoneInput = z.infer<typeof updateMilestoneSchema>;

export type CreateRiskInput = z.infer<typeof createRiskSchema>;
export type UpdateRiskInput = z.infer<typeof updateRiskSchema>;
export type RiskQuery = z.infer<typeof riskQuerySchema>;
