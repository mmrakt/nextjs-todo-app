import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const id = req.query.id as string
  switch (req.method) {
    case 'GET':
      const user = await prisma.user.findFirst({
        where: { id },
      })

      if (user) {
        res.status(200).json(user)
      } else {
        res.status(400).json({ debugMessage: `User [id=${id}] not found` })
      }
      break
    case 'PATCH':
      try {
        const value = JSON.parse(req.body)
        await prisma.user.update({ where: { id }, data: value })
        res.status(200).end()
      } catch (error) {
        console.error(error)
        res.status(500).end()
      }
      break
    default:
      res.status(405).end()
  }
}

export default handler
