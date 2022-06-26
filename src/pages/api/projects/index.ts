import { NextApiRequest, NextApiResponse } from 'next'
import prisma, { Project } from '@/libs/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'GET') {
    const userId = String(req.query.userId)
    const statusNum = Number(req.query.status)
    const isArchived = statusNum === 1 ? true : false

    const projects: Project[] = await prisma.project.findMany({
      where: {
        isArchived: {
          equals: isArchived,
        },
        userId: {
          equals: userId,
        },
      },
    })

    if (projects) {
      res.status(200).json(projects)
    } else {
      res.status(400).json({ debugMessage: 'There was no one...' })
    }
  } else if (req.method === 'POST') {
    try {
      const { name, userId } = JSON.parse(req.body)
      await prisma.project.create({
        data: {
          name,
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
