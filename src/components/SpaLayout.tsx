import React from 'react'

import MediaQuery from 'react-responsive'
import Layout from './Layout'
import SideMenu from './SideMenu'
import Header from './header/index'

type IProps = {
  children: React.ReactNode
}

function SpaLayout(props: IProps): React.ReactElement {
  return (
    <Layout>
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
    </Layout>
  )
}

export default SpaLayout
