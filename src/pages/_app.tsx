import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { AppProps } from 'next/app'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'
import React from 'react'
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

export const AuthContext = React.createContext(null)

const queryClient = new QueryClient()

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

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

              <NextAuthProvider session={pageProps.session}>
                <NextNprogress />
                <Component {...pageProps} />
              </NextAuthProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </Provider>
    </>
  )
}

export default MyApp
