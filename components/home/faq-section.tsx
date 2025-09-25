'use client'

import React, {useState} from 'react'
import {faqs} from '@/data/faq'
import {ChevronDownIcon} from 'lucide-react'
import {cn} from '@/lib/utils'

export default function FaqSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	
	return (
		<section className="py-20 bg-gray-50">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
					<p className="text-gray-600">Все, что нужно знать о наших тарифах</p>
				</div>
				<div className="space-y-4">
					{faqs.map((faq, i) => (
						<div className="bg-white rounded-2xl shadow-sm" key={i}>
							<button
								onClick={() => setOpenIndex(openIndex === i ? null : i)}
								className="w-full px-8 py-6  text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer"
							>
								<span className="font-semibold tracking-wide text-gray-900">{faq.question}</span>
								<ChevronDownIcon className={cn("size-5 text-gray-500", openIndex === i && 'rotate-180')}/>
							</button>
							{openIndex === i && (
								<div className="px-8 pb-6">
									<p className="text-gray-600">{faq.answer}</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
