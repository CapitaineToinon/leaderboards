import { defineAbilityFor } from '$lib/server/casl'
import { verify } from '$lib/server/jose'
import type { Handle, Cookies } from '@sveltejs/kit'
import { errors } from 'jose'

async function getUserFromEvent({ cookies }: { cookies: Cookies }) {
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
	event.locals.user = await getUserFromEvent(event)
	event.locals.abilities = defineAbilityFor(event.locals.user)

	return await resolve(event)
}) satisfies Handle
