import { NextApiRequest, NextApiResponse } from 'next'
import prisma, { Todo } from '@/libs/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { query, method, body } = req

  if (method === 'GET') {
    const statusNum = Number(query.status)
    const isCompleted = statusNum === 1 ? true : false
    const userId = String(query.userId)
    const projectId = Number(query.projectId)
    const sortNum = Number(query.sort)
    const isOldestSort = sortNum === 1 ? true : false

    let todos: Todo[] = []
    if (isCompleted) {
      // TODO: projectId = 0の時のハンドリング
      todos = await prisma.todo.findMany({
        where: {
          isCompleted: {
            equals: isCompleted,
          },
          userId: {
            equals: userId,
          },
          projectId: {
            equals: projectId,
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
          projectId: {
            equals: projectId,
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
  } else if (method === 'POST') {
    try {
      const { content, userId, projectId } = JSON.parse(body)
      const data = {
        content,
        userId,
        projectId: projectId ? projectId : null,
      }
      await prisma.todo.create({ data })
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
