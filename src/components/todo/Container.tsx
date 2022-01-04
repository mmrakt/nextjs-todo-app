import { Container } from '@material-ui/core'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'

import Filter from './Filter'
import Input from './Input'
import TodoTabPanel from './TabPanel'

function TodoContainer(): React.ReactElement {
  const statuses = ['ALL', 'TODO', 'DONE']
  const [checked, setChecked] = useState(false)
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'authenticated') {
      setChecked(true)
    } else if (status === 'unauthenticated') {
      Router.push('/signin')
    }
  }, [status])

  if (!checked) return null

  return (
    <Container maxWidth="sm">
      <Input />
      <Filter />
      {statuses.map((status, index) => (
        <TodoTabPanel key={index} status={status} />
      ))}
    </Container>
  )
}

export default TodoContainer
