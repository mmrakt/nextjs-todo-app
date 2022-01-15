import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const id = req.query.id as string
    const user = await prisma.user.findFirst({
      where: { id },
    })

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(400).json({ debugMessage: `User [id=${id}] not found` })
    }
  }
}

export default handler
