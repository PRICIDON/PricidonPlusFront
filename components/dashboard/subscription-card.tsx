import type {ReactNode} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {LucideIcon} from 'lucide-react'
import {cn} from '@/lib/utils'

interface SubscriptionCardProps {
	icon?: LucideIcon
	iconBg?: string
	iconColor?: string
	title?: string
	description?: ReactNode
	children?: ReactNode
	action?: ReactNode
}

export default function SubscriptionCard({ icon: Icon,iconBg, iconColor, title, description, action, children }: SubscriptionCardProps) {
	return (
		<Card className="border-0 gap-0 shadow-xs">
			<CardHeader>
				<CardTitle className="text-lg">Подписка</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-center">
						{Icon && (
							<div className={cn("mx-auto size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4", iconBg)}>
								<Icon className={cn("size-8", iconColor)}></Icon>
							</div>
							)}
					{title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
					{description && <p className="text-gray-600 text-sm mb-6">{description}</p>}
				</div>
				{children}
				{action}
			</CardContent>
		</Card>
	)
}
