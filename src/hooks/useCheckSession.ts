import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

const useCheckSession = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') return null

  if (status === 'unauthenticated') {
    router.push('/signin')
    return null
  }

  return {
    authStatus: true,
    user: session?.user,
  }
}

export default useCheckSession
