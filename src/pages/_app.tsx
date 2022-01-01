import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { AuthProvider } from '../auth/AuthProvider'
import theme from '../components/theme'
import store from '../store/store'
import 'minireset.css'
import '../base.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.css'

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
        <title>日報つーる</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <SessionProvider session={session}>
                <NextNprogress />
                <Component {...pageProps} />
              </SessionProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </Provider>
    </>
  )
}

export default MyApp
