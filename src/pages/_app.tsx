import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from "next/app";
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { makeServer } from '../../server';
import { SidebarDrawerProvider } from '../contexts/SideBarDrawerContext';
import { clientProvider } from '../services/queryClient';
import { theme } from '../styles/theme';

makeServer()

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <QueryClientProvider client={clientProvider}>
      <ReactQueryDevtools />
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
