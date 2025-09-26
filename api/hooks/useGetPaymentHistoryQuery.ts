import {
	useQuery,
	type UseQueryOptions
} from '@tanstack/react-query'
import type { PaymentHistoryResponse} from '@/api/types'
import {getPaymentHistory} from '@/api/request/payment'

export function useGetPaymentHistoryQuery(options?: Omit<UseQueryOptions<PaymentHistoryResponse[], unknown>, "queryKey" | 'queryFn'>) {
	return useQuery({
		queryKey: ['get payment history'],
		queryFn: getPaymentHistory,
		...options
	})
}
