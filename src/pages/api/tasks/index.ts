import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const status = Number(req.query.status)
    const isCompleted = status === 1 ? true : false
    const tasks = await prisma.task.findMany({
      where: {
        done: {
          equals: isCompleted,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    if (tasks) {
      res.status(200).json(tasks)
    } else {
      res.status(400).json({ debugMessage: 'There was no one...' })
    }
  } else if (req.method === 'POST') {
    try {
      const { content, userId } = JSON.parse(req.body)
      await prisma.task.create({
        data: {
          content,
          userId,
        },
      })
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
