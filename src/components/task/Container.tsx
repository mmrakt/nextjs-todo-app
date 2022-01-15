import { Container } from '@material-ui/core'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'

import InputText from './InputText'
import List from './List'

function TodoContainer(): React.ReactElement {
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
      <InputText />
      <div className="mt-10">
        <List />
      </div>
    </Container>
  )
}

export default TodoContainer
