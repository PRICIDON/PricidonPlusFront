'use client'
import React, {useState} from 'react'
import {
	InitPaymentRequestBillingPeriod,
	PlanResponse,
	SubscriptionResponseStatus
} from '@/api/types'
import {cn} from '@/lib/utils'
import {Switch} from '@/components/ui/switch'
import {Card} from '@/components/ui/card'
import {LayoutIconOne} from '@/components/icons/layout-icon-one'
import {LayoutIconTwo} from '@/components/icons/layout-icon-two'
import {LayoutIconThree} from '@/components/icons/layout-icon-three'
import {Button} from '@/components/ui/button'
import {CheckIcon} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {useAuth} from '@/hooks/useAuth'
import PaymentModal from '@/components/home/payment-modal'
import {useGetMeQuery} from '@/api/hooks/useGetMeQuery'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Props {
	plans: PlanResponse[]
	
}

const icons = {
		Базовый: <LayoutIconOne className="size-9"/>,
		Профессиональный: <LayoutIconTwo className="size-9"/>,
		Бизнес: <LayoutIconThree className="size-9"/>,
	}

export default function PricingSection({plans}: Props) {
	const router = useRouter()
	
	const [isYearly, setIsYearly] = useState(false)
	const [selectedPlan, setSelectedPlan] = useState<PlanResponse | null>(null)
	const [pendingPlan, setPendingPlan] = useState<PlanResponse | null>(null)
	
	
	const [isConfirmReplaceOpen, setIsConfirmReplaceOpen] = useState(false)
	const [isPaymentOpen, setIsPaymentOpen] = useState(false)

	
	const {isAuthorized} = useAuth()
	const {data: user, isLoading} = useGetMeQuery()
	
	const hasActiveSubscription = isAuthorized && !isLoading && user?.subscription && user.subscription.status === SubscriptionResponseStatus.ACTIVE
	
	const isSamePlan = (planId: string) => user?.subscription?.plan.id === planId
	
	const handleGetStarted = (plan: PlanResponse) => {
		if(!isAuthorized) return router.push('/auth/login')
		
		if(hasActiveSubscription && !isSamePlan(plan.id)) {
			setPendingPlan(plan)
			setIsConfirmReplaceOpen(true)
			
			return
		}
		
		setSelectedPlan(plan)
		setIsPaymentOpen(true)
	}
	
	const confirmPlanReplace = () => {
		if(!pendingPlan) return
		
		setSelectedPlan(pendingPlan)
		setIsPaymentOpen(true)
		setIsConfirmReplaceOpen(false)
	}
	
	const calculateYearlyDiscount = (monthlyPrice: number, yearlyPrice: number) => {
		const yearlyMonthly = yearlyPrice / 12
		
		const discount = ((monthlyPrice - yearlyMonthly) / monthlyPrice) * 100
		
		return Math.round(discount)
	}
	
	return (
		<>
			<section className="px-6 pb-20">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-center mb-12">
						<div className="flex flex-col items-center gap-4">
							<div className="flex items-center gap-3 px-4 py-2">
								<span className={cn('text-sm font-medium transition-colors', isYearly ? 'text-gray-500' : "text-gray-900")}>
									Месячно
								</span>
								<Switch checked={isYearly} onCheckedChange={setIsYearly} />
								<span className={cn('text-sm font-medium transition-colors', isYearly ? 'text-gray-900' : "text-gray-500")}>
									Годовая
								</span>
							</div>
							{isYearly && (
								<div className="bg-orange-500 text-white px-3 py-1 rounded-lg text-xs font-medium">Экономия 20%</div>
							)}
						</div>
					</div>
					
					<div className="grid md:grid-cols-3 gap-8">
						{plans.map((plan, i) => {
							const displayPrice = isYearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice
							const isCurrentPlan = isSamePlan(plan.id)
							
							const buttonText = !isAuthorized
								? "Выбрать тариф"
								: isLoading
									? "Загрузка..."
									: hasActiveSubscription && isCurrentPlan
										? "Продлить подписку"
										: hasActiveSubscription &&  !isCurrentPlan
											? "Переключиться"
											: "Выбрать тариф"
							
							return (
								<Card key={i} className={cn('relative bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-3xl p-8', plan.isFeatured && 'ring-2 shadow-xl transform ring-offset-2 ring-orange-500')}>
									<div className="mb-6">
										<div className="size-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-4 text-3xl shadow-md border-2 border-orange-600">
											{icons[plan.title as keyof typeof icons]}
										</div>
										<h3 className="text-2xl font-bold text-shadow-gray-900 mb-2">{plan.title}</h3>
										<p className="text-gray-600 text-sm mb-6">{plan.description}</p>
										<div className="mb-6">
											<div className="flex items-baseline gap-1">
												<span className="text-4xl font-bold text-gray-900">{displayPrice}&#8381;</span>
												<span className="text-gray-500">/ в месяц</span>
											</div>
											{isYearly ? (
												<div className="text-sm text-gray-500">{plan.yearlyPrice}&#8381; </div>
											) : (
												<div className="text-sm text-gray-500">Останавливайте и отменяйте подписку в любой момент</div>
											)}
											{isYearly && (
												<div className="text-sm text-gray-500">Оплата за весь год, экономия {calculateYearlyDiscount(plan.monthlyPrice, plan.yearlyPrice)}%</div>
											)}
										</div>
										<Button size="lg" className="w-full" onClick={() => handleGetStarted(plan)}>{buttonText}</Button>
										
									</div>
									
									<div className="space-y-4">
										<h4 className="font-semibold text-gray-900 mb-4">В тариф входит:</h4>
										{plan.features.map((feature, i) => (
											<div className="flex items-start gap-x-3" key={i}>
												<div className="size-5 bg-orange-500 items-center justify-center rounded-full flex">
													<CheckIcon className="size-3 text-white" />
												</div>
												<span className="text-gray-700 text-sm">{feature}</span>
											</div>
										))}
									</div>
								</Card>
							)
						})}
					</div>
				</div>
			</section>
			{selectedPlan && (
				<PaymentModal
					isOpen={isPaymentOpen}
					onClose={() => setIsPaymentOpen(false)}
					plan={selectedPlan}
					price={isYearly ? selectedPlan?.yearlyPrice : selectedPlan?.monthlyPrice}
					billingPeriod={isYearly ? InitPaymentRequestBillingPeriod.YEARLY : InitPaymentRequestBillingPeriod.MONTHLY}
				/>
			)}
			<AlertDialog open={isConfirmReplaceOpen} onOpenChange={setIsConfirmReplaceOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Смена тарифа</AlertDialogTitle>
            <AlertDialogDescription>
	            У вас уже активна подписка на тариф <b>{user?.subscription?.plan?.title}</b>, до {new Date(user?.subscription?.endDate || "").toLocaleDateString()}
	            <br/>
	            Если вы выберете другой план, остаток текущей подписки сгорит.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
           <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmPlanReplace}>Продолжить</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
		</>
	)
}
