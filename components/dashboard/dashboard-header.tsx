'use client'
import React from 'react'
import {useGetMeQuery} from '@/api/hooks/useGetMeQuery'
import {UserIcon} from 'lucide-react'


export default function DashboardHeader() {
	const { data: user, isLoading} = useGetMeQuery()
	
	return (
		<header className="flex items-center justify-between">
			<div className="">
				<h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
				<p className="text-gray-600 mt-1">Усправляйте своей подпиской и платежами</p>
			</div>
			<div className="flex items-center gap-3">
				<div className="size-10 rounded-full bg-orange-500 flex items-center justify-center">
					<UserIcon className="size-5 text-white"/>
				</div>
				<div className="">
					{isLoading ? "Загрузка..." : <>
						<p className="font-medium text-gray-900">{user?.name}</p>
						<p className="text-sm text-gray-600">{user?.email}</p>
					</>}
				</div>
			</div>
		</header>
	)
}
