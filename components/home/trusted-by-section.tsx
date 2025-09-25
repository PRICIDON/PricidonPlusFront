import React from 'react'
import {companies} from '@/data/companies'
import Link from 'next/link'
import Image from 'next/image'


export default function TrustedBySection() {
	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Нам доверяют лидеры</h2>
					<p className="text-gray-600">Присоединяйтесь к тысячам компаний, которые уже используют нашу платформу</p>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-20 items-center">
					{companies.map((company, i) => (
						<Link key={i} href={company.website} target="_blank">
							<div className="w-[150px] h-[100px] flex items-center justify-center">
								<Image src={`/images/companies/${company.logo}`} alt={company.name} width={150} height={100} className="object-contain"/>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
