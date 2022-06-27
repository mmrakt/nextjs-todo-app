import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import TodoContainer from '../../components/todo/TodoContainer'
import Loading from '@/components/common/Loading'
import { useFetchProject } from '@/hooks/project'

const ProjectTodo: React.VFC = () => {
  const { query } = useRouter()
  const projectId = query ? String(query.projectId) : ''
  const { data: project, isLoading, isError } = useFetchProject(projectId)

  // TODO: 本番では差し替えておく
  const result = {
    id: 'cl2myuo0x00297kiby38pl87e',
  }
  if (isLoading) return <Loading />

  return (
    <Layout>
      <TodoContainer project={project} user={result} />
    </Layout>
  )
}

export default ProjectTodo
