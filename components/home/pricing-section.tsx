'use client'
import React, {useState} from 'react'
import type {PlanResponse} from '@/api/types'
import {cn} from '@/lib/utils'
import {Switch} from '@/components/ui/switch'
import {Card} from '@/components/ui/card'

interface Props {
	plans: PlanResponse[]
	
}

export default function PricingSection({plans}: Props) {
	const [isYearly, setIsYearly] = useState(false)
	
	return (
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
						
						return (
							<Card key={i} className={cn('relative bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-3xl p-8', plan.isFeatured && 'ring-2 shadow-xl transform ring-offset-2 ring-orange-500')}></Card>
						)
					})}
				</div>
			</div>
		</section>
	)
}
