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
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0}>
          <AvatarImage imageSrc={session?.user?.image} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu shadow bg-dark-800 rounded-box w-52"
        >
          {session?.user ? (
            <>
              <DropdownMenuItem href="/today" displayText="TODO" />
              <DropdownMenuItem href="/settings" displayText="Settings" />
              <DropdownMenuItem
                onClick={handleSignout}
                displayText="Sign out"
              />
            </>
          ) : (
            <>
              <DropdownMenuItem href="/signin" displayText="Sign in" />
              <DropdownMenuItem href="/signup" displayText="Sign up" />
            </>
          )}
        </ul>
      </div>
    </>
  )
})

ToggleMenu.displayName = 'ToggleMenu'

export default ToggleMenu
