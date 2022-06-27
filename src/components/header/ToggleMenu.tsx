import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import AvatarImage from '../common/AvatarImage'
import MenuItem from '../common/MenuItem'

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
              <MenuItem href="/inbox" displayText="TODO" />
              <MenuItem href="/settings" displayText="Settings" />
              <MenuItem onClick={handleSignout} displayText="Sign out" />
            </>
          ) : (
            <>
              <MenuItem href="/signin" displayText="Sign in" />
              <MenuItem href="/signup" displayText="Sign up" />
            </>
          )}
        </ul>
      </div>
    </>
  )
})

ToggleMenu.displayName = 'ToggleMenu'

export default ToggleMenu
