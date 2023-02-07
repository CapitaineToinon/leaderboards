import { verify } from '$lib/server/jose'
import type { Handle, Cookies } from '@sveltejs/kit'
import { errors } from 'jose'

async function getUserFromCookies(cookies: Cookies) {
	const token = cookies.get('auth_token')

	if (!token) {
		return null
	}

	try {
		const user = await verify(token)
		return user
	} catch (e) {
		if (e instanceof errors.JWTExpired) {
			cookies.delete('auth_token')
			return null
		}

		throw e
	}
}

export const handle = (async ({ event, resolve }) => {
	const { cookies, locals } = event
	const user = await getUserFromCookies(cookies)

	locals.user = user

	return await resolve({
		...event,
		locals,
		cookies
	})
}) satisfies Handle
