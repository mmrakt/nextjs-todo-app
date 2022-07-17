import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Loading from '@/components/common/Loading'

const ProtectedRoutes = dynamic(() => import('../routes/ProtectedRoutes'))

const Index = (): JSX.Element => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') return <Loading />

  if (status === 'unauthenticated') {
    // router.push('/signin')
  }

  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <ProtectedRoutes />}
    </div>
  )
}

export default Index
