import { ChakraProvider } from '@chakra-ui/react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-calendar/dist/Calendar.css'
import { Provider } from 'react-redux'

import theme from '../components/theme'
import store from '../store/store'
import chakuraUiTheme from '../theme/chakraUiTheme'
import 'minireset.css'
import '../base.css'
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
        <title>TODO App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <ChakraProvider theme={chakuraUiTheme}>
              <CssBaseline />
              <SessionProvider session={session}>
                <NextNprogress />
                <Component {...pageProps} />
              </SessionProvider>
            </ChakraProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default MyApp
