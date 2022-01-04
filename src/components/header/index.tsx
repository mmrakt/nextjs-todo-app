import Link from 'next/link'
import React from 'react'
import MediaQuery from 'react-responsive'

import ToggleMenu from './ToggleMenu'

const Header = React.memo(() => (
  <div className="shadow-lg h-20 flex dark:bg-dark-gray">
    <MediaQuery query="(max-width: 1000px)">
      <p className="mx-4 py-8 font-black text-xl">
        <Link href="/">
          <a>TODO App</a>
        </Link>
      </p>
    </MediaQuery>
    <MediaQuery query="(min-width: 1000px)">
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
