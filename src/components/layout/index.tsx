import Router from 'next/router'
import React, { useEffect, useState } from 'react'

import Header from '../header/index'

type LayoutProps = {
  children: React.ReactNode
  title: string
}

function Layout(props: LayoutProps): React.ReactElement {
  return (
    <div className="flex-grow dark:text-white dark:bg-dark-black bg-gray-100 h-screen">
      <Header />
      <main className="pc:py-10 py-6">
        <div className="max-w-2xl mx-auto">{props.children}</div>
      </main>
    </div>
  )
}

export default Layout
