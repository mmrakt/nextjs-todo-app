import { Avatar, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import AvatarImage from '../common/AvatarImage'
import DropdownMenuItem from '../common/DropdownMenuItem'

const ToggleMenu = React.memo(() => {
  const { data: session }: any = useSession()
  const router = useRouter()

  const handleSignout = () => {
    signOut({
      callbackUrl: router.basePath,
    })
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Avatar}
        icon={<AvatarImage imageSrc={session?.user?.image} />}
      />
      <MenuList bg="dark.800" borderColor="dark.700">
        {session?.user ? (
          <>
            <Link href="/today">
              <a>
                <DropdownMenuItem displayText="TODO" />
              </a>
            </Link>
            <Link href="/settings">
              <a>
                <DropdownMenuItem displayText="Settings" />
              </a>
            </Link>
            <div onClick={handleSignout}>
              <DropdownMenuItem displayText="Sign out" />
            </div>
          </>
        ) : (
          <>
            <Link href="/signin">
              <a>
                <DropdownMenuItem displayText="Sign in" />
              </a>
            </Link>
            <Link href="/signup">
              <a>
                <DropdownMenuItem displayText="Sign up" />
              </a>
            </Link>
          </>
        )}
      </MenuList>
    </Menu>
  )
})

ToggleMenu.displayName = 'ToggleMenu'

export default ToggleMenu
