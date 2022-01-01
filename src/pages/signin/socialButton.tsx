import React from 'react'
import { signIn } from 'next-auth/react'

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
      className={`${theme} hover:${hoverColor} text-white font-bold py-2 px-4 my-2 rounded`}
      onClick={() => {
        signIn(id)
      }}
    >
      {name} アカウントでログイン
    </button>
  )
}

export default SocialButton
