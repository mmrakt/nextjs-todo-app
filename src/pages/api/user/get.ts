import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const user = await prisma.user.findFirst({
      where: { id: Number(req.query.id) },
    })
    return res.status(200).json(user)
  }
}

export default handler
