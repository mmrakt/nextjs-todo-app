import Link from 'next/link'
import React from 'react'
import MediaQuery from 'react-responsive'
// import { Link } from 'react-router-dom'

import ToggleMenu from './ToggleMenu'

const Header = React.memo(() => (
  <div className="shadow-lg h-20 flex dark:bg-dark-800">
    <MediaQuery maxWidth={1000}>
      <p className="mx-4 py-8 font-black text-xl">
        <Link href="/">
          <a>TODO App</a>
        </Link>
      </p>
    </MediaQuery>
    <MediaQuery minWidth={1001}>
      <p className="px-8 py-8 font-black text-xl">
        <Link href="/">
          <a>TODO App</a>
        </Link>
      </p>
    </MediaQuery>
    <div className="ml-auto mr-8 py-4">
      <ToggleMenu />
    </div>
  </div>
))

Header.displayName = 'Header'

export default Header
