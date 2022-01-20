import { Container } from '@material-ui/core'
import React from 'react'

import useCheckSession from '../../hooks/useCheckSession'
import CompletedList from './CompletedList'
import InputText from './InputText'
import List from './List'

function TodoContainer(): React.ReactElement {
  useCheckSession()

  return (
    <Container maxWidth="sm">
      <InputText />
      <div className="mt-10">
        <List />
      </div>
      <div className="mt-10">
        <CompletedList />
      </div>
    </Container>
  )
}

export default TodoContainer
