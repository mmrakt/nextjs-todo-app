import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../libs/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const id = Number(req.query.id)
  switch (req.method) {
    case 'GET':
      const project = await prisma.project.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
      })

      if (project) {
        res.status(200).json(project)
      } else {
        res.status(400).json({ debugMessage: `project [id=${id}] not found` })
      }
      break
    case 'PATCH':
      try {
        const value = JSON.parse(req.body)
        await prisma.project.update({ where: { id }, data: value })
        res.status(200).end()
      } catch (error) {
        console.error(error)
        res.status(500).end()
      }
      break
    case 'DELETE':
      try {
        await prisma.project.delete({ where: { id } })
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
