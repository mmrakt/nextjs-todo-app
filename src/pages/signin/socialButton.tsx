import { signIn } from 'next-auth/react'
import React from 'react'
import { FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'

type IProps = {
  providerId: string
  providerName: string
  theme: string
  hoverColor: string
}

function SocialButton({
  providerId,
  providerName,
  theme,
  hoverColor,
}: IProps): React.ReactElement {
  const iconSize = 20

  return (
    <button
      className={`${theme} hover:${hoverColor} text-white font-bold py-3 px-4 my-4 rounded`}
      onClick={() => {
        signIn(providerId)
      }}
    >
      <p className="flex items-center gap-3">
        {providerName === 'GitHub' ? (
          <FaGithub size={iconSize} />
        ) : providerName === 'Twitter' ? (
          <FaTwitter size={iconSize} />
        ) : providerName === 'Google' ? (
          <FaGoogle size={iconSize} />
        ) : null}
        Sign in with {providerName}
      </p>
    </button>
  )
}

export default SocialButton
