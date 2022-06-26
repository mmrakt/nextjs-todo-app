import { Project } from '@prisma/client'
import { Session } from 'next-auth'
import React from 'react'

import InputText from '../../components/todo/InputText'
import TodoList from '../../components/todo/TodoList'
import Header from './Header'
import { useFetchTodos } from '@/hooks/todo'

type IProps = {
  project?: Project
  user: Session['user']
}

const TodoContainer: React.VFC<IProps> = ({ project, user }) => {
  const queryResults = useFetchTodos('cl2myuo0x00297kiby38pl87e')
  return (
    <>
      <Header pageTitle={project?.name} />
      <div className="mt-3" />
      <InputText />
      {queryResults.map((query, i) => (
        <div className="mt-10" key={i}>
          <TodoList query={query} userId={user.id} />
        </div>
      ))}
    </>
  )
}

export default TodoContainer
