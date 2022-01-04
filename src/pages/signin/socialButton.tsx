import { signIn } from 'next-auth/react'
import React from 'react'

type IProps = {
  id: string
  name: string
  theme: string
  hoverColor: string
}

function SocialButton({
  id,
  name,
  theme,
  hoverColor,
}: IProps): React.ReactElement {
  return (
    <button
      className={`${theme} hover:${hoverColor} text-white font-bold py-3 px-4 my-4 rounded`}
      onClick={() => {
        signIn(id)
      }}
    >
      {name}
      {' '}
      アカウントでログイン
    </button>
  )
}

export default SocialButton
