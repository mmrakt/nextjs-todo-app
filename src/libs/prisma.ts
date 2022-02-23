// import { PrismaClient } from '@prisma/client'
import { PrismaClient as localPrismaClient } from '../../prisma/generated/local'
import { PrismaClient as productionPrismaClient } from '../../prisma/generated/production'

let prisma
if (process.env.NODE_ENV === 'production') {
  prisma = new productionPrismaClient({
    log: ['query', 'error', 'info', 'warn'],
  })
} else {
  prisma = new localPrismaClient({
    log: ['query', 'error', 'info', 'warn'],
  })
}

export default prisma

export * from '@prisma/client'
