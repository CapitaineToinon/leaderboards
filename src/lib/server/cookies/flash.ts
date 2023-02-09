import type { Cookies } from '@sveltejs/kit'
const cookieName = 'flash_message'

const options = {
	path: '/',
	httpOnly: true,
	sameSite: 'strict',
	secure: import.meta.env.PROD
} as const

export function getCookie({ cookies }: { cookies: Cookies }) {
	const cookie = cookies.get(cookieName)
	deleteCookie({ cookies })
	return cookie
}

export function setCookie({ message, cookies }: { message: string; cookies: Cookies }) {
	return cookies.set(cookieName, message, options)
}

function deleteCookie({ cookies }: { cookies: Cookies }) {
	return cookies.delete(cookieName, options)
}
