import {
	InitPaymentRequest,
	InitPaymentResponse,
	PaymentDetailsResponse
} from '@/api/types'
import {api, instance} from '@/api/instance'

export const getPaymentById = async (id: string) => await api.get<PaymentDetailsResponse>(`/payment/${id}`).then(res => res.data)

export const initPayment = async (data: InitPaymentRequest) => await instance.post<InitPaymentResponse>('/payment/init', data).then(res => res.data);
