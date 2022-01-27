import { Container } from '@material-ui/core'
import React from 'react'

import useCheckSession from '../../hooks/useCheckSession'
import CompletedList from './CompletedList'
import InputText from './InputText'
import List from './List'

function TodoContainer(): React.ReactElement {
  const { authStatus, userId } = useCheckSession()
  if (authStatus === false) return null

  return (
    <Container maxWidth="sm">
      <InputText />
      <div className="mt-10">
        <List userId={userId} />
      </div>
      <div className="mt-10">
        <CompletedList />
      </div>
    </Container>
  )
}

export default TodoContainer
