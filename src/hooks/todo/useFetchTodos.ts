import { Todo } from '@prisma/client'
import { useQuery } from 'react-query'

const useFetchTodos = (userId) => {
  return useQuery<Todo[]>(['todos'], async () => {
    const res = await fetch(`/api/todos?status=0&userId=${userId}`)
    return res.json()
  })
}

export { useFetchTodos }
