import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany()

    if (users) {
      res.status(200).json(users)
    } else {
      res.status(400).json({ debugMessage: 'There was no one...' })
    }
  }
}

export default handler
