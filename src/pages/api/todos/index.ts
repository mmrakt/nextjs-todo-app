import { NextApiRequest, NextApiResponse } from 'next'
import prisma, { Todo } from '@/libs/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const statusNum = Number(req.query.status)
    const isCompleted = statusNum === 1 ? true : false
    const userId = String(req.query.userId)
    const sortNum = Number(req.query.sort)
    const isOldestSort = sortNum === 1 ? true : false

    let todos: Todo[] = []
    if (isCompleted) {
      todos = await prisma.todo.findMany({
        where: {
          isCompleted: {
            equals: isCompleted,
          },
          userId: {
            equals: userId,
          },
        },
        orderBy: {
          completedAt: 'desc',
        },
      })
    } else {
      todos = await prisma.todo.findMany({
        where: {
          isCompleted: {
            equals: isCompleted,
          },
          userId: {
            equals: userId,
          },
        },
        orderBy: {
          createdAt: isOldestSort ? 'asc' : 'desc',
        },
      })
    }

    if (todos) {
      res.status(200).json(todos)
    } else {
      res.status(400).json({ debugMessage: 'There was no one...' })
    }
  } else if (req.method === 'POST') {
    try {
      const { content, userId } = JSON.parse(req.body)
      await prisma.todo.create({
        data: {
          content,
          userId,
        },
      })
      res.status(200).end()
    } catch (error) {
      console.error(error)
      res.status(500).end()
    }
  } else {
    res.status(405).end()
  }
}

export default handler
