import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import Filter from '@/components/todo/Filter'
import Input from '@/components/todo/Input'
import TodoTabPanel from '@/components/todo/TabPanel'
import Router from 'next/router'
import { useSession } from 'next-auth/react'

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
