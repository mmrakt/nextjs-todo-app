import { Todo } from '@prisma/client'
import { useQueries } from 'react-query'
import { STATUSES } from '../../constants/index'

const useFetchTodos = (userId: string) => {
  return useQueries([
    {
      queryKey: ['todos', { status: STATUSES['isNotCompleted'] }],
      queryFn: () => fetchTodos(userId, STATUSES['isNotCompleted']),
    },
    {
      queryKey: ['todos', { status: STATUSES['isCompleted'] }],
      queryFn: () => fetchTodos(userId, STATUSES['isCompleted']),
    },
  ])
}

const fetchTodos = async (userId: string, status: number): Promise<Todo[]> => {
  const res = await fetch(`/api/todos?status=${status}&userId=${userId}`)
  return res.json()
}

export { useFetchTodos }
