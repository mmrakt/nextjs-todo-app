import Header from '../header/index'
import Router from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'

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
