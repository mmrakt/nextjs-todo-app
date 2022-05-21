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
              <li className="hover:bg-dark-700">
                <Link href="/today">
                  <a>TODO</a>
                </Link>
              </li>
              <li className="hover:bg-dark-700">
                <Link href="/settings">
                  <a>Settings</a>
                </Link>
              </li>
              <li className="hover:bg-dark-700">
                <div onClick={handleSignout}>Sign out</div>
              </li>
            </>
          ) : (
            <>
              <li className="hover:bg-dark-700">
                <Link href="/signin">
                  <a>Sign in</a>
                </Link>
              </li>
              <li className="hover:bg-dark-700">
                <Link href="/signup">
                  <a>Sign up</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  )
})

ToggleMenu.displayName = 'ToggleMenu'

export default ToggleMenu
