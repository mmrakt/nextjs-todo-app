import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
import React, { FC } from 'react'

const StyledMenuItem = ({ text }) => (
  <MenuItem bg="dark.800" _hover={{ background: 'dark.700' }}>
    {text}
  </MenuItem>
)

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
      <MenuList bg="dark.800" borderColor="dark.700">
        {session?.user ? (
          <div>
            <Link href="/today">
              <a>
                <StyledMenuItem text="TODO" />
              </a>
            </Link>
            <Link href="/settings">
              <a>
                <StyledMenuItem text="Settings" />
              </a>
            </Link>
            <div onClick={handleSignout}>
              <StyledMenuItem text="Sign out" />
            </div>
          </div>
        ) : (
          <div>
            <Link href="/signin">
              <a>
                <StyledMenuItem text="Sign in" />
              </a>
            </Link>
            <Link href="/signup">
              <a>
                <StyledMenuItem text="Sign up" />
              </a>
            </Link>
          </div>
        )}
      </MenuList>
    </Menu>
  )
})

ToggleMenu.displayName = 'ToggleMenu'

export default ToggleMenu
