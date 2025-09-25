import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface AuthWrapperProps {
	title: string
	description: string
	bottomText?: string
	bottomTextLink?: string
	bottomLinkHref?: string
	children: React.ReactNode
}

export default function AuthWrapper({ title, description, bottomText, bottomTextLink, bottomLinkHref, children }: AuthWrapperProps) {
	return (
		<div className="flex min-h-screen">
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#FFF4EC] via-[#FFEBDD] to-[#FFDAB3] relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-[#FFF4EC]/90 via-[#FFEBDD]/90 to-[#FFDAB3]/90"/>
				<div className="relative z-10 flex flex-col justify-center items-center p-12 h-full w-full">
					<Image src="/images/logo.svg" alt="Auth" width={100} height={100} />
				</div>
			</div>
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
				<div className="mx-auto w-full max-w-md">
					<div className="text-center lg: text-left">
						<h1 className="text-3xl font-bold">{title}</h1>
						<p className="text-muted-foreground mt-2">{description}</p>
						
					</div>
				
				<div className="my-5 p-0">{children}</div>
				
				{bottomText && bottomTextLink && bottomLinkHref && <p className="text-muted-foreground text-center text-[15px]">{bottomText}{" "}<Link className="text-orange-500 font-medium" href={bottomLinkHref}>{bottomTextLink}</Link></p>}
				</div>
			</div>
		</div>
	)
}
