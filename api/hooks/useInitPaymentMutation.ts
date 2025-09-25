import {useMutation, type UseMutationOptions} from '@tanstack/react-query'
import { initPayment } from '@/api/request/payment'
import type {
	InitPaymentRequest,
	InitPaymentResponse
} from '@/api/types'

export function useInitPaymentMutation(options?: Omit<UseMutationOptions<InitPaymentResponse, unknown, InitPaymentRequest>, "mutationKey" | 'mutationFn'>) {
	return useMutation({
		mutationKey: ['init payment'],
		mutationFn: (data: InitPaymentRequest) => initPayment(data),
		...options
	})
}
