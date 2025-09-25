import React from 'react'
import type {Metadata} from 'next'
import LoginForm from '@/components/auth/login-form'

export const metadata: Metadata = {
	title: "Вход в аккаунт"
}

export default function LoginPage() {
	return <LoginForm />
}
