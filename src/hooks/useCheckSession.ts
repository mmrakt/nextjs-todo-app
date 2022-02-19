import { useSession } from 'next-auth/react'
import Router from 'next/router'
import React from 'react'

const useCheckSession = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') return null

  if (status === 'unauthenticated') {
    Router.push('/signin')
    return null
  }

  return {
    authStatus: true,
    user: session.user,
  }
}

export default useCheckSession
