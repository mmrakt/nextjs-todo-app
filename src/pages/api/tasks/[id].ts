import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../libs/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'GET':
      const id = Number(req.query.id)
      const task = await prisma.task.findFirst({
        where: { id },
      })

      if (task) {
        res.status(200).json(task)
      } else {
        res.status(400).json({ debugMessage: `task [id=${id}] not found` })
      }
      break
    case 'PATCH':
      try {
        const id = Number(req.query.id)
        const value = JSON.parse(req.body)
        console.log(value)
        await prisma.task.update({ where: { id }, data: value })
        res.status(200).end()
      } catch (error) {
        console.error(error)
        res.status(500).end()
      }
      break
    case 'DELETE':
      try {
        const id = Number(req.query.id)
        await prisma.task.delete({ where: { id } })
        res.status(200).json({
          ok: true,
        })
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
