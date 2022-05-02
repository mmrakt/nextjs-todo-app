import { List as ChakraUiList } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import Row from './Row'
import { Task } from '@/libs/prisma'

function List({ userId }: { userId: string }): any {
  const { data: tasks, isLoading } = useQuery<Task[]>('tasks', async () => {
    const res = await fetch(`/api/tasks?status=0&userId=${userId}`)
    return res.json()
  })

  if (isLoading) return <span>Loading...</span>

  return (
    <ChakraUiList>
      {tasks.map((task, index) => (
        <Row data-testid="todoItem" key={index} {...task} />
      ))}
    </ChakraUiList>
  )
}

export default List
