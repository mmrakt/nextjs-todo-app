import React from 'react'

import Layout from '../../components/Layout'
import InputText from '../../components/todo/InputText'
import TodoList from '../../components/todo/TodoList'
import useCheckSession from '../../hooks/useCheckSession'
import { useFetchTodos } from '@/hooks/todo'

function Today(): React.ReactElement {
  // TODO: ログインチェックをミドルウェアに移す
  // const result = useCheckSession()
  // if (result === null) return null
  // const { id } = result.user

  const userId = 'cl2myuo0x00297kiby38pl87e'
  const queryResults = useFetchTodos(userId)

  return (
    <Layout>
      <InputText />
      {queryResults.map((query, i) => (
        <div className="mt-10" key={i}>
          <TodoList query={query} userId={userId} />
        </div>
      ))}
    </Layout>
  )
}

export default Today
