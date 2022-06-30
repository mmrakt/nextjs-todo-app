import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import Layout from '../components/Layout'
import Project from '../pages/[projectId]/index'
import Inbox from '../pages/inbox/index'
import Settings from '../pages/settings/index'
import Loading from '@/components/common/Loading'
import { lazyImport } from '@/utils/lazyImport'

// TODO: lazy import は今後試す
// const { Settings } = lazyImport(() => import('@/pages/settings'), 'Settings')
// const { Profile } = lazyImport(() => import('@/features/users'), 'Profile')
// const { Users } = lazyImport(() => import('@/features/users'), 'Users')

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </Layout>
  )
}

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/settings/*', element: <Settings /> },
      { path: '/inbox', element: <Inbox /> },
      { path: '/:project', element: <Project /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
]
