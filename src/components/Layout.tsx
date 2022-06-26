import React from 'react'

import MediaQuery from 'react-responsive'
import SideMenu from './SideMenu'
import Header from './header/index'

type LayoutProps = {
  children: React.ReactNode
}

function Layout(props: LayoutProps): React.ReactElement {
  return (
    <div className="flex-grow dark:text-white dark:bg-dark-850 bg-gray-100 h-screen">
      <Header />
      <MediaQuery maxWidth={1000}>
        <main className="py-6">
          <div className="max-w-2xl mx-auto">{props.children}</div>
        </main>
      </MediaQuery>
      <MediaQuery minWidth={1001}>
        <div className="flex h-screen">
          <SideMenu />
          <main className="flex-auto h-full">
            <div className="py-10 max-w-2xl mx-auto">{props.children}</div>
          </main>
        </div>
      </MediaQuery>
    </div>
  )
}

export default Layout
