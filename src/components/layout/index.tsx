import React from 'react'
import Header from '../header/index'

type LayoutProps = {
  children: React.ReactNode
  title: string
}

function Layout(props: LayoutProps): React.ReactElement {
  return (
    <div className="flex-grow">
      <Header />
      <main className="max-w-screen-md mx-auto my-20">
        <div>{props.children}</div>
      </main>
    </div>
  )
}

export default Layout
