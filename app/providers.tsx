'use client'
import {useState, ReactNode} from 'react'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'


interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	const [client] = useState(new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			}
		}
	}))
	return (
		<QueryClientProvider client={client}>
			{children}
		</QueryClientProvider>
	)
}
