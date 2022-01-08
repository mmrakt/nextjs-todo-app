import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { MenuItemProps } from '@material-ui/core'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React, { FC } from 'react'

const StyledMenuItem: FC<MenuItemProps> = ({ children }) => (
  <MenuItem bg="dark.gray" _hover={{ background: 'dark.lightGray' }}>
    {children}
  </MenuItem>
)

const ToggleMenu = React.memo(() => {
  const { data: session }: any = useSession()

  const handleSignout = () => {
    signOut({
      callbackUrl: Router.basePath,
    })
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Avatar}
        icon={
          <Image
            src={session?.user?.image || '/avatar.png'}
            alt="avatar image"
            width={50}
            height={50}
            className="rounded-full"
          />
        }
      />
      <MenuList bg="dark.gray" borderColor="dark.lightGray">
        {session?.user ? (
          <div>
            <StyledMenuItem>
              <Link href={`/${session?.user?.customId}`}>
                <a>マイページ</a>
              </Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <div onClick={handleSignout}>ログアウト</div>
            </StyledMenuItem>
          </div>
        ) : (
          <div>
            <StyledMenuItem>
              <Link href="/signin">
                <a>ログイン</a>
              </Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <Link href="/signup">
                <a>ユーザー登録</a>
              </Link>
            </StyledMenuItem>
          </div>
        )}
      </MenuList>
    </Menu>
  )
})

ToggleMenu.displayName = 'ToggleMenu'

export default ToggleMenu
