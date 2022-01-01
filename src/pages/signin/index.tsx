import React from 'react'
import Layout from '../../components/layout'
import SocialButton from './socialButton'
import { ClientSafeProvider, getProviders } from 'next-auth/react'

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

function Signin({
  providers,
}: {
  providers: ClientSafeProvider
}): React.ReactNode {
  return (
    <Layout title="ログイン">
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <SocialButton
            id={provider.id}
            name={provider.name}
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
    </Layout>
  )
}

export default Signin
