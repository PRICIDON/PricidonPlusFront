import React from 'react'
import Image from 'next/image'
import {companyLinks, productLinks, supportLinks} from '@/data/footer'
import Link from 'next/link'

export default function SiteFooter() {
	return (
		<footer className="bg-gray-900 text-white py-16">
			<div className="max-w-7xl mx-auto">
				<div className="grid md:grid-cols-4 gap-8">
					<div className="">
						<div className="flex items-center gap-x-2 mb-2">
							<Image src="/images/logo.svg" alt="PricidonPlus" width={30} height={30}/>
							<span className="text-xl font-semibold text-white">PricidonPlus</span>
						</div>
						<p className="mb-6 text-gray-400">PricidonPlus - место, где все просто работает</p>
					</div>
					<div className="">
						<h3 className="font-semibold mb-4">Продукт</h3>
						<ul className="space-y-2 text-gray-400">
							{productLinks.map((link, i) => (
								<li  key={i}>
									<Link href={link.href} className="hover:text-white transition-colors">{link.title}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="">
						<h3 className="font-semibold mb-4">О компании</h3>
						<ul className="space-y-2 text-gray-400">
							{companyLinks.map((link, i) => (
								<li  key={i}>
									<Link href={link.href} className="hover:text-white transition-colors">{link.title}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="">
						<h3 className="font-semibold mb-4">Поддержка</h3>
						<ul className="space-y-2 text-gray-400">
							{supportLinks.map((link, i) => (
								<li  key={i}>
									<Link href={link.href} className="hover:text-white transition-colors">{link.title}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	)
}
