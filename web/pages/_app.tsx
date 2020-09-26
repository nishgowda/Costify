import Head from 'next/head'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import UserContextProvider from '../utils/me'

function MyApp({ Component, pageProps }: any) {

  return (
    <ThemeProvider>
      <CSSReset />
      <UserContextProvider>
      <Head>
          <title>Costify</title>
          </Head>
        <Component {...pageProps} />
        </UserContextProvider>
    </ThemeProvider>
  );
}

export default MyApp
