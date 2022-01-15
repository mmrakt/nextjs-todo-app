import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

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
      console.log('hoge')
      try {
        const id = Number(req.query.id)
        await prisma.task.update({ where: { id }, data: { done: true } })
        res.json({
          ok: true,
        })
        return
      } catch (error) {
        res.json({
          ok: false,
          error,
        })
      }
  }
}

export default handler
