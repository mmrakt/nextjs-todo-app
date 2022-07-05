import { Project } from '@prisma/client'
import { useRouter } from 'next/router'
import React from 'react'
import { UseQueryResult, useQueryClient } from 'react-query'
import { TODO_STATUSES } from '../../constants/index'
import Loading from '../common/Loading'

type IProps = {
  query: UseQueryResult<Project[]>
}

const ProjectList: React.VFC<IProps> = ({ query }) => {
  const { data: projects, isLoading, isError } = query
  const queryClient = useQueryClient()
  const router = useRouter()

  if (isLoading) return <Loading />

  const handlePageTransition = (projectId: number) => {
    queryClient.resetQueries([
      'todos',
      {
        status: TODO_STATUSES['isNotCompleted'],
        projectId,
      },
    ])
    router.push(`/${projectId}`)
  }
  return (
    <ul>
      {projects.map((project) => (
        <li
          key={project.id}
          className="hover:bg-dark-700 p-3 rounded-md text-lg"
        >
          <div>
            <button
              onClick={() => {
                handlePageTransition(project.id)
              }}
            >
              {project.name}
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ProjectList
