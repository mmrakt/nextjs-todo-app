import { useSession } from 'next-auth/react'
import { useRoutes } from 'react-router-dom'

import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

export const AppRoutes = () => {
  const { data: session } = useSession()

  const commonRoutes = [{ path: '/', element: <div>hogehoge</div> }]

  const routes = session.user ? protectedRoutes : publicRoutes

  const element = useRoutes([...routes, ...commonRoutes])

  return <>{element}</>
}
