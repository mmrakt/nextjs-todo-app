import { Todo } from '@prisma/client'
import { useQueries } from 'react-query'
import { STATUSES } from '../../constants/index'
import useFilter from './useFilter'

const useFetchTodos = (userId: string) => {
  const { data } = useFilter()
  const keyAndFunction = data
    ? [
        {
          queryKey: ['todos', { status: STATUSES['isNotCompleted'] }],
          queryFn: () => fetchTodos(userId, STATUSES['isNotCompleted']),
        },
        {
          queryKey: ['todos', { status: STATUSES['isCompleted'] }],
          queryFn: () => fetchTodos(userId, STATUSES['isCompleted']),
        },
      ]
    : [
        {
          queryKey: ['todos', { status: STATUSES['isNotCompleted'] }],
          queryFn: () => fetchTodos(userId, STATUSES['isNotCompleted']),
        },
      ]

  return useQueries(keyAndFunction)
}

const fetchTodos = async (userId: string, status: number): Promise<Todo[]> => {
  const res = await fetch(`/api/todos?status=${status}&userId=${userId}`)
  return res.json()
}

export { useFetchTodos }
