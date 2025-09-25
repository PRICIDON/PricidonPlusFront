import React from 'react'
import {Metadata} from 'next'
import {getPaymentById} from '@/api/request/payment'
import {notFound} from 'next/navigation'
import {Card, CardContent} from '@/components/ui/card'
import {CheckCircleIcon} from 'lucide-react'
import {PaymentDetailsResponseBillingPeriod} from '@/api/types'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
	title: "Успешная оплата"
}

export default async function PaymentSuccessPage({ params } : {params: Promise<{id: string}>}) {
	const { id } = await params
	
	const payment = await getPaymentById(id).catch(() => notFound())
	
	const plan = payment.subscription.plan
	
	const price = payment.billingPeriod === PaymentDetailsResponseBillingPeriod.MONTHLY ? plan.monthlyPrice : plan.yearlyPrice
	
	const periodShort = payment.billingPeriod === PaymentDetailsResponseBillingPeriod.MONTHLY ? "в месяц" : "в год"
	const period = payment.billingPeriod === PaymentDetailsResponseBillingPeriod.MONTHLY ? "Ежемесячно" : "Ежегодно"
	
	return (
		<div className={"min-h-screen bg-gray-50 flex items-center justify-center"}>
			<div className="max-w-md w-full">
				<Card className="border-0 shadow-lg text-center">
					<CardContent className="p-8">
						<div className="mb-6">
							<div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<CheckCircleIcon className="size-8 text-green-600"/>
							</div>
							<h1 className="text-2xl font-bold text-gray-900 mb-2">
								Оплата прошла успешно!
							</h1>
							<p className="text-gray-600">
								Спасибо за покупку. Ваша подписка активирована.
							</p>
						</div>
						<div className="bg-gray-50 rounded-lg p-4 text-left">
							<h3 className="font-semibold mb-2">
								Детали заказа:
							</h3>
							<div className="space-y-1 text-sm text-gray-600 mb-6">
								<div className="flex justify-between">
									<span>Тариф:</span>
									<span className="font-medium">{plan.title}</span>
								</div>
								<div className="flex justify-between">
									<span>Стоимость:</span>
									<span className="font-medium">{price}&#8381;/{periodShort}</span>
								</div>
								<div className="flex justify-between">
									<span>Период оплаты:</span>
									<span className="font-medium">{period}</span>
								</div>
								<div className="flex justify-between">
									<span>ID транзакции:</span>
									<span className="font-mono text-xs">{payment.id}</span>
								</div>
							</div>
							<Button className="w-full" size="lg" asChild>
								<Link href="/dashboard">Перейти в личный кабинет</Link>
							</Button>
							<p className="text-xs text-muted-foreground mt-6 text-center">Чек отправлен на вашу электронную почту. Если у вас есть вопросы, идите нахуй пожалуйста.</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
