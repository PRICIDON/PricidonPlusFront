import {InitPaymentRequestProvider} from '@/api/types'
import {LucideIcon} from 'lucide-react'

export interface PaymentMethod {
	id: InitPaymentRequestProvider
	name: string
	description: string
	icon: LucideIcon
	bg: string
	textColor: string
}
