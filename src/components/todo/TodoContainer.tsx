import { Session } from 'next-auth'
import React from 'react'

import InputText from '../../components/todo/InputText'
import TodoList from '../../components/todo/TodoList'
import Header from './Header'
import { useFetchTodos } from '@/hooks/todo'

const TodoContainer: React.VFC<Pick<Session, 'user'>> = ({ user }) => {
  const queryResults = useFetchTodos(user.id)
  return (
    <>
      <Header />
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
