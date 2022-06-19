import { Todo } from '@prisma/client'
import { useQueries, useQueryClient } from 'react-query'
import { TODO_STATUSES, TODO_SORT } from '../../constants/index'
import useFilter from './useFilter'
import useSort from './useSort'

const useFetchTodos = (userId: string) => {
  const { data: isShowCompleted } = useFilter()
  const { data: isLatestOrder } = useSort()
  const sortNum = isLatestOrder ? 0 : 1

  const queryKeyAndFunc = isShowCompleted
    ? [
        {
          queryKey: [
            'todos',
            { status: TODO_STATUSES['isNotCompleted'] },
            sortNum,
          ],
          queryFn: () =>
            fetchTodos(userId, TODO_STATUSES['isNotCompleted'], sortNum),
        },
        {
          queryKey: ['todos', { status: TODO_STATUSES['isCompleted'] }],
          queryFn: () =>
            fetchTodos(userId, TODO_STATUSES['isCompleted'], sortNum),
        },
      ]
    : [
        {
          queryKey: [
            'todos',
            { status: TODO_STATUSES['isNotCompleted'] },
            sortNum,
          ],
          queryFn: () =>
            fetchTodos(userId, TODO_STATUSES['isNotCompleted'], sortNum),
        },
      ]

  return useQueries(queryKeyAndFunc)
}

const fetchTodos = async (
  userId: string,
  status: number,
  sort: number
): Promise<Todo[]> => {
  const res = await fetch(
    `/api/todos?status=${status}&userId=${userId}&sort=${sort}`
  )
  return res.json()
}

export { useFetchTodos }
