import {
	useQuery,
	type UseQueryOptions
} from '@tanstack/react-query'
import type { GetMeResponse } from '@/api/types'
import { getMe } from '@/api/request/users'

export function useGetMeQuery(options?: Omit<UseQueryOptions<GetMeResponse, unknown>, "queryKey" | 'queryFn'>) {
	return useQuery({
		queryKey: ['get me'],
		queryFn: getMe,
		...options
	})
}
