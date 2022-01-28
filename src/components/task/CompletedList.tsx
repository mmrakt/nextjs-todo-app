import { List as ChakraUiList } from '@chakra-ui/react'
import { Task } from '@prisma/client'
import React from 'react'
import { useQuery } from 'react-query'
import Row from './Row'

function CompletedList({ userId }: { userId: string }): any {
  const { data: tasks, isLoading } = useQuery<Task[]>(
    'completedTasks',
    async () => {
      const res = await fetch(`/api/tasks?status=1&userId=${userId}`)
      return res.json()
    }
  )

  if (isLoading) return <span>Loading...</span>

  return (
    <ChakraUiList>
      {tasks.map((task, index) => (
        <Row data-testid="todoItem" key={index} {...task} />
      ))}
    </ChakraUiList>
  )
}

export default CompletedList
