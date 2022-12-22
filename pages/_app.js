import '../styles/tailwind.css'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 60 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
