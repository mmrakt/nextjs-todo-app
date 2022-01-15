import { List as ChakraUiList } from '@chakra-ui/react'
import { Task } from '@prisma/client'
import React from 'react'
import { useQuery } from 'react-query'
import Item from './Item'

function List(): any {
  const { data: tasks, isLoading } = useQuery<Task[]>('tasks', async () => {
    const res = await fetch('/api/tasks')
    return res.json()
  })

  if (isLoading) return <span>Loading...</span>

  const incompletedTasks = tasks.filter((task) => {
    return !task.done
  })

  return (
    <ChakraUiList>
      {incompletedTasks.map((task, index) => (
        <Item data-testid="todoItem" key={index} {...task} />
      ))}
    </ChakraUiList>
  )
}

export default List
