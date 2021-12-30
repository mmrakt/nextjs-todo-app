import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import MediaQuery from 'react-responsive'

import Drawer from './drawer'
import HeaderItem from './headerItem'
import HEADER_ITEMS from './items'
import MenuList from './menuList'

const Header = React.memo(() => {
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false)
  const [isSelectedTab, setSelectedTab] = React.useState<string>('')
  const router = useRouter()

  const handleDrawer = () => {
    if (!isOpenDrawer) {
      setIsOpenDrawer(true)
    } else {
      setIsOpenDrawer(false)
    }
  }

  React.useEffect(() => {
    setSelectedTab(router.asPath)
  }, [router])

  return (
    <div className="shadow-lg h-20 flex">
      <MediaQuery query="(max-width: 1000px)">
        <p className="ml-8 py-7">
          <MenuIcon className="" onClick={handleDrawer} fontSize="large" />
        </p>
        <Drawer isOpenDrawer={isOpenDrawer} handleClose={handleDrawer} />
        <p className="mx-4 py-8 font-black text-xl">
          <Link href="/">
            <a>日報ツール</a>
          </Link>
        </p>
      </MediaQuery>
      <MediaQuery query="(min-width: 1000px)">
        <p className="px-8 py-8 font-black text-xl">
          <Link href="/">
            <a>日報ツール</a>
          </Link>
        </p>
        {HEADER_ITEMS.map((item) => (
          <HeaderItem
            url={item.url}
            name={item.name}
            textColor={
              item.url === isSelectedTab ? 'text-black' : 'text-gray-400'
            }
            key={item.name}
          />
        ))}
      </MediaQuery>
      <div className="ml-auto mr-8 py-4">
        <MenuList />
      </div>
    </div>
  )
})

Header.displayName = 'Header'

export default Header
