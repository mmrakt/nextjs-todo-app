import type { NextApiHandler } from 'next'
import prisma from '@/lib/prisma'

const handler: NextApiHandler = async ({ body }, res) => {
  try {
    const { content, userId } = JSON.parse(body)
    await prisma.task.create({
      data: {
        content,
        userId,
      },
    })
    res.json({
      ok: true,
    })
    console.log('OK!')
    return
  } catch (error) {
    console.log('error...')
    res.json({
      ok: false,
      error,
    })
  }
}

export default handler
