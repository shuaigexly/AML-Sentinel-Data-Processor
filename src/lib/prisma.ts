import { PrismaClient } from '@prisma/client';

// PrismaClient singleton for Next.js development mode
// Prevents multiple instances during hot reloading

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Note: Database URL is configured in prisma.config.ts for Prisma 7.x
// In production, the DATABASE_URL environment variable is used

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
