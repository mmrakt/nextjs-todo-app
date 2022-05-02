import { PrismaClient as LocalPrismaClient } from '../../prisma/generated/local'
import { PrismaClient as ProdPrismaClient } from '../../prisma/generated/prod'

let prisma
if (process.env.NODE_ENV === 'production') {
  prisma = new ProdPrismaClient({
    log: ['query', 'error', 'info', 'warn'],
  })
} else {
  prisma = new LocalPrismaClient({
    log: ['query', 'error', 'info', 'warn'],
  })
}

export default prisma

export * from '@prisma/client'
