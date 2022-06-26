import { ClientSafeProvider, getProviders, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

import Layout from '../../components/Layout'
import SocialButton from './socialButton'

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

const SigninConatiner = ({
  providers,
}: {
  providers: ClientSafeProvider
}): ReactElement => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') return null

  if (status === 'authenticated') {
    router.push('/inbox')
    return null
  }

  return (
    <div className="text-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <SocialButton
            providerId={provider.id}
            providerName={provider.name}
            theme={
              provider.name === 'GitHub'
                ? 'bg-gray-500'
                : provider.name === 'Google'
                ? 'bg-red-400'
                : provider.name === 'Twitter'
                ? 'bg-blue-500'
                : ''
            }
            hoverColor={
              provider.name === 'GitHub'
                ? 'bg-gray-600'
                : provider.name === 'Google'
                ? 'bg-red-500'
                : provider.name === 'Twitter'
                ? 'bg-blue-600'
                : ''
            }
          />
        </div>
      ))}
    </div>
  )
}

const Signin = ({
  providers,
}: {
  providers: ClientSafeProvider
}): ReactElement => {
  return (
    <Layout>
      <SigninConatiner providers={providers} />
    </Layout>
  )
}

export default Signin
