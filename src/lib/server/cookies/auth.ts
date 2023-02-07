import type { Cookies } from '@sveltejs/kit'
const cookieName = 'auth_token'

const options = {
	path: '/',
	httpOnly: true,
	sameSite: 'strict',
	secure: import.meta.env.PROD
} as const

export function getCookie({ cookies }: { cookies: Cookies }) {
	return cookies.get(cookieName)
}

export function setCookie({ token, cookies }: { token: string; cookies: Cookies }) {
	return cookies.set(cookieName, token, options)
}

export function deleteCookie({ cookies }: { cookies: Cookies }) {
	return cookies.delete(cookieName, options)
}
