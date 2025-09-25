import React from 'react'
import {
	InitPaymentRequestBillingPeriod,
	InitPaymentRequestProvider,
	PlanResponse
} from '@/api/types'
import {
	Dialog,
	DialogContent, DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form} from '@/components/ui/form'
import PaymentMethods from '@/components/home/payment-methods'
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {useInitPaymentMutation} from '@/api/hooks/useInitPaymentMutation'

export const initPaymentSchema = z.object({
	planId: z.string(),
	provider: z.enum(InitPaymentRequestProvider),
	billingPeriod: z.enum(InitPaymentRequestBillingPeriod),
	
})


export type InitPaymentFormValues = z.infer<typeof initPaymentSchema>

interface Props {
	isOpen: boolean
	onClose: () => void
	plan: PlanResponse
	price: number
	billingPeriod: InitPaymentRequestBillingPeriod
}

export default function PaymentModal({isOpen, onClose, plan, price, billingPeriod}: Props) {
	const router = useRouter()
	
	const { mutate, isPending} = useInitPaymentMutation({
		onSuccess(data) {
			router.push(data.url!)
		}
	})
	
	const form = useForm<InitPaymentFormValues>({
		resolver: zodResolver(initPaymentSchema),
		defaultValues: {
			planId: plan.id,
			provider: InitPaymentRequestProvider.YOOKASSA,
			billingPeriod,
		}
	})
	
	const { isValid } = form.formState
 
	const onSubmit = (values: InitPaymentFormValues) => {
		mutate(values)
	}
	
	return (
		<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Оплата</DialogTitle>
					<DialogDescription>Тариф "{plan.title}" - {price}&#8381;/{billingPeriod === InitPaymentRequestBillingPeriod.MONTHLY ? "месяц" : "год"}</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<PaymentMethods control={form.control}/>
						<div className="flex gap-x-3 pt-4">
							<Button size="lg" className="flex-1" type="button" variant="outline" onClick={onClose}>Отмена</Button>
							<Button size="lg" className="flex-1" type="submit" disabled={!isValid || isPending}>Продолжить</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
