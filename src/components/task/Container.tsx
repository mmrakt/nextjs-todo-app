import React from 'react'

import useCheckSession from '../../hooks/useCheckSession'
import CompletedList from './CompletedList'
import InputText from './InputText'
import List from './List'

function TodoContainer(): React.ReactElement {
  const result = useCheckSession()
  if (result === null) return null
  const { id } = result.user

  return (
    <div>
      <InputText />
      <div className="mt-10">
        <List userId={id} />
      </div>
      <div className="mt-10">
        <CompletedList userId={id} />
      </div>
    </div>
  )
}

export default TodoContainer
