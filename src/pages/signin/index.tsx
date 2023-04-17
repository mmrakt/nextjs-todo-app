import { ClientSafeProvider, getProviders, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

import SocialButton from '../../components/socialButton'
import Layout from '@/components/Layout'
import Loading from '@/components/common/Loading'

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

const SigninConatiner = ({
  providers,
}: {
  providers: ClientSafeProvider[]
}): ReactElement => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') return <Loading />

  if (status === 'authenticated') {
    router.push('/inbox')
    return null
  }

  return (
    <div className="text-center">
      {providers &&
        Object.values(providers).map((provider) => (
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
  providers: ClientSafeProvider[]
}): ReactElement => {
  return (
    <Layout>
      <SigninConatiner providers={providers} />
    </Layout>
  )
}

export default Signin
