import {useMutation, type UseMutationOptions} from '@tanstack/react-query'

import type {
	UpdateAutoRenewalRequest, UpdateAutoRenewalResponse
} from '@/api/types'
import {toggleAutoRenewal} from '@/api/request/users'

export function useToggleAutoRenewal(options?: Omit<UseMutationOptions<UpdateAutoRenewalResponse,unknown, UpdateAutoRenewalRequest>, "mutationKey" | 'mutationFn'>) {
	return useMutation({
		mutationKey: ['toggle auto renewal'],
		mutationFn: (data: UpdateAutoRenewalRequest) => toggleAutoRenewal(data),
		...options
	})
}
