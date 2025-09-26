import {instance} from '@/api/instance'
import {GetMeResponse, UpdateAutoRenewalRequest} from '@/api/types'

export const getMe = async () => await instance.get<GetMeResponse>('/users/@me').then(res => res.data)

export const toggleAutoRenewal = async (data: UpdateAutoRenewalRequest) => await instance.patch('/users/@me/auto-renewal', data).then(res => res.data)
