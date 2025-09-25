'use client'
import React from 'react'
import Image from 'next/image'
import {useAuth} from '@/hooks/useAuth'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

export default function SiteHeader() {
	const { isAuthorized } = useAuth()
	
	return (
		<header className="w-full px-6 py-4">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="flex items-center gap-x-2">
					<Image src={'/images/logo.svg'} alt={'PricidonPlus'} width={30} height={30}/>
					<span className="text-xl font-semibold text-gray-800">PricidonPlus</span>
				</div>
				<div className="flex items-center gap-x-4 ">
					{isAuthorized ? (
						<Button size="sm" asChild>
							<Link href="/dashboard">Личный кабинет</Link>
						</Button>
					) : (
						<>
							<Button size="sm" variant="ghost" asChild>
								<Link href="/auth/login">Войти</Link>
							</Button>
							<Button size="sm" asChild>
								<Link href="/auth/register">Регистрация</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	)
}
