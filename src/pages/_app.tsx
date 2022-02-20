import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import chakuraUiTheme from '../theme/chakraUiTheme'
import 'minireset.css'
import '../../styles/globals.css'
import 'tailwindcss/tailwind.css'

export const AuthContext = React.createContext(null)

const queryClient = new QueryClient()

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>TODO App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={chakuraUiTheme}>
          <SessionProvider session={session}>
            <NextNprogress />
            <Component {...pageProps} />
          </SessionProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
