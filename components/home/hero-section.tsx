import React from 'react'

export default function HeroSection() {
	return (
		<section className="px-6 py-16 text-center">
			<div className="max-w-4xl mx-auto">
				<div className="flex items-center justify-center mb-8">
					<div className="flex items-center space-x-2 text-sm text-gray-600 border py-1 px-4 rounded-full">
						<div className="size-2 bg-orange-500 rounded-full"/>
						<span className="">Тарифы</span>
					</div>
				</div>
				<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-[68px]">
					Гибкие тарифные планы <br/> для любых задач
				</h1>
				
				<p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Подберите тариф, который действительно подойдет именно вам - будь то старт небольшой идеи или масштабный проект.</p>
			</div>
		</section>
	)
}
