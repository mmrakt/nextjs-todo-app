import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../libs/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const id = Number(req.query.id)
  switch (req.method) {
    case 'GET':
      const task = await prisma.task.findFirst({
        where: { id },
      })

      if (task) {
        res.status(200).end()
      } else {
        res.status(400).json({ debugMessage: `task [id=${id}] not found` })
      }
      break
    case 'PATCH':
      try {
        const value = JSON.parse(req.body)
        await prisma.task.update({ where: { id }, data: value })
        res.status(200).end()
      } catch (error) {
        console.error(error)
        res.status(500).end()
      }
      break
    case 'DELETE':
      try {
        await prisma.task.delete({ where: { id } })
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
