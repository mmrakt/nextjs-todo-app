import { Todo } from '@prisma/client'
import { useQueries, useQueryClient } from 'react-query'
import { TODO_STATUSES, TODO_SORT } from '../../constants/index'
import useFilter from './useFilter'
import useSort from './useSort'

type IProps = {
  userId: string
  projectId?: number
}

const useFetchTodos = ({ userId, projectId = 0 }: IProps) => {
  const { data: isShowCompleted } = useFilter()
  const { data: isLatestOrder } = useSort()
  const sortNum = isLatestOrder ? 0 : 1

  const queryKeyAndFunc = isShowCompleted
    ? [
        {
          queryKey: [
            'todos',
            {
              status: TODO_STATUSES['isNotCompleted'],
              sortNum,
              projectId,
            },
            ,
          ],
          queryFn: () =>
            fetchTodos(
              userId,
              TODO_STATUSES['isNotCompleted'],
              sortNum,
              projectId
            ),
        },
        {
          queryKey: [
            'todos',
            {
              status: TODO_STATUSES['isCompleted'],
              sortNum,
              projectId,
            },
          ],
          queryFn: () =>
            fetchTodos(
              userId,
              TODO_STATUSES['isCompleted'],
              sortNum,
              projectId
            ),
        },
      ]
    : [
        {
          queryKey: [
            'todos',
            {
              status: TODO_STATUSES['isNotCompleted'],
              sortNum,
              projectId,
            },
            sortNum,
          ],
          queryFn: () =>
            fetchTodos(
              userId,
              TODO_STATUSES['isNotCompleted'],
              sortNum,
              projectId
            ),
        },
      ]

  return useQueries(queryKeyAndFunc)
}

const fetchTodos = async (
  userId: string,
  status: number,
  sort: number,
  projectId?: number
): Promise<Todo[]> => {
  const res = await fetch(
    `/api/todos?status=${status}&userId=${userId}&projectId=${projectId}&sort=${sort}`
  )
  return res.json()
}

export { useFetchTodos }
