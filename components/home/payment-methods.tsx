import React from 'react'
import {Control} from 'react-hook-form'
import {InitPaymentFormValues} from '@/components/home/payment-modal'
import {FormControl, FormField, FormItem} from '@/components/ui/form'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {paymentMethods} from '@/data/payment-methods'
import {Label} from '@/components/ui/label'
import {cn} from '@/lib/utils'

interface PaymentMethodsProps {
	control: Control<InitPaymentFormValues>
}

export default function PaymentMethods({ control }: PaymentMethodsProps) {
	
	return (
		<FormField control={control} name="provider" render={({field}) => (
			<FormItem>
				<FormControl>
					<RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-2">
						{paymentMethods.map((method, i) => {
							const isSelected = String(field.value) === method.id
							return (
								<FormItem key={i}>
									<FormControl>
										<RadioGroupItem value={method.id} id={method.id} className="sr-only"></RadioGroupItem>
									</FormControl>
									<Label
										htmlFor={method.id}
										className={cn("rounded-xl border-2 transition-all p-4 gap-4 duration-200 cursor-pointer", isSelected ? 'border-orange-500 bg-orange-50' : "border-gray-200 bg-white hover:border-gray-300")}
									>
										<div className={cn("rounded-lg size-10 flex justify-center items-center", isSelected ? 'bg-orange-500' : method.bg)}>
											<method.icon className={cn("size-5", isSelected ? 'text-white' : method.textColor)}/>
										</div>
										<div className="flex-1">
											<h3 className={cn('font-semibold', isSelected ? "text-orange-900" : "text-gray-900")}>{method.name}</h3>
											<p className={cn("text-sm mt-1", isSelected ? 'text-orange-700' : 'text-muted-foreground')}>{method.description}</p>
										</div>
									</Label>
								</FormItem>
							)})
						}
					</RadioGroup>
				</FormControl>
			</FormItem>
		)}/>
	)
}
