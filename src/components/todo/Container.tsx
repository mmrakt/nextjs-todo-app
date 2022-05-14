import React from 'react'

import useCheckSession from '../../hooks/useCheckSession'
import CompletedList from './CompletedList'
import InputText from './InputText'
import TodoList from './TodoList'

function TodoContainer(): React.ReactElement {
  const result = useCheckSession()
  if (result === null) return null
  const { id } = result.user

  return (
    <div>
      <InputText />
      <div className="mt-10" />
      <TodoList userId={id} />
      <div className="mt-10" />
      {/* <CompletedList userId={id} /> */}
    </div>
  )
}

export default TodoContainer
