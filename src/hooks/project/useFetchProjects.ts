import { Project } from '@prisma/client'
import { useQueries } from 'react-query'
import { PROJECT_STATUSES } from '../../constants/index'
import useFilter from './useFilter'

const useFetchProjects = (userId: string) => {
  const { data: isShowArchived } = useFilter()

  const queryKeyAndFunc = isShowArchived
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
): Promise<Project[]> => {
  const res = await fetch(`/api/projects?status=${status}&userId=${userId}`)

  return res.json()
}

export { useFetchProjects }
