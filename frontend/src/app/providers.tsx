'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = useState(
    () => new QueryClient({
      defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
    })
  )
  return (
    <Provider store={store}>
      <QueryClientProvider client={qc}>
        {children}
      </QueryClientProvider>
    </Provider>
  )
}
