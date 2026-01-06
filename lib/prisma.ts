import { PrismaClient } from "@prisma/client/extension";


const globlaForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
} 


export const prisma = 
    globlaForPrisma.prisma ??
    new PrismaClient({
        log: ['query'],
    })


if (process.env.NODE_ENV !== "production")
    globlaForPrisma.prisma = prisma;