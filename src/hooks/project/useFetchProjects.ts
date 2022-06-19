import { Todo } from '@prisma/client'
import { useQueries } from 'react-query'
import { PROJECT_STATUSES } from '../../constants/index'
import useFilter from './useFIlter'

const useFetchTodos = (userId: string) => {
  const { data: isShowCompleted } = useFilter()

  const queryKeyAndFunc = isShowCompleted
    ? [
        {
          queryKey: ['projects', { status: PROJECT_STATUSES['isNotArchived'] }],
          queryFn: () =>
            fetchProjects(userId, PROJECT_STATUSES['isNotArchived']),
        },
        {
          queryKey: ['projects', { status: PROJECT_STATUSES['isArchived'] }],
          queryFn: () => fetchProjects(userId, PROJECT_STATUSES['isArchived']),
        },
      ]
    : [
        {
          queryKey: ['projects', { status: PROJECT_STATUSES['isNotArchived'] }],
          queryFn: () =>
            fetchProjects(userId, PROJECT_STATUSES['isNotArchived']),
        },
      ]

  return useQueries(queryKeyAndFunc)
}

const fetchProjects = async (
  userId: string,
  status: number
): Promise<Todo[]> => {
  const res = await fetch(`/api/projects?status=${status}&userId=${userId}`)
  return res.json()
}

export { useFetchTodos }
