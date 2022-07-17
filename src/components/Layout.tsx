import React from 'react'

type IProps = {
  children: React.ReactNode
}

function Layout(props: IProps): React.ReactElement {
  return (
    <div className="flex-grow dark:text-white dark:bg-dark-850 bg-gray-100 h-screen">
      {props.children}
    </div>
  )
}

export default Layout
