import { PrismaClient as LocalPrismaClient } from '../../prisma/generated/client'

const prisma = new LocalPrismaClient({
  log: ['query', 'error', 'info', 'warn'],
})

export default prisma

export * from '@prisma/client'
