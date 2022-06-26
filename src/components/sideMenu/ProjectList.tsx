import { Project } from '@prisma/client'
import React from 'react'
import { UseQueryResult } from 'react-query'
import Loading from '../common/Loading'

type IProps = {
  query: UseQueryResult<Project[]>
}

const ProjectList: React.VFC<IProps> = ({ query }) => {
  const { data: projects, isLoading, isError } = query

  if (isLoading) return <Loading />
  return (
    <ul>
      {projects.map((project) => (
        <li
          key={project.id}
          className="hover:bg-dark-700 p-3 rounded-md text-lg"
        >
          {project.name}
        </li>
      ))}
    </ul>
  )
}

export default ProjectList
