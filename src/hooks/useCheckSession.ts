import { useSession } from 'next-auth/react'
import Router from 'next/router'
import React from 'react'

function useCheckSession() {
  const [checked, setChecked] = React.useState(false)
  const { data: session, status } = useSession()
  React.useEffect(() => {
    if (status === 'authenticated') {
      setChecked(true)
    } else if (status === 'unauthenticated') {
      Router.push('/signin')
    }
  }, [status, session])

  if (!checked)
    return {
      authStatus: false,
      userId: '',
    }

  return {
    authStatus: true,
    userId: session.user.id,
  }
}

export default useCheckSession
