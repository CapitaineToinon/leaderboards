import { defineAbilityFor } from '$lib/server/casl'
import { verify } from '$lib/server/jose'
import type { Handle, Cookies } from '@sveltejs/kit'
import { errors } from 'jose'
import { getCookie, deleteCookie } from '$lib/server/cookies/auth'

async function getUserFromEvent({ cookies }: { cookies: Cookies }) {
	const token = getCookie({ cookies })

	if (!token) {
		return null
	}

	try {
		const user = await verify(token)
		return user
	} catch (e) {
		if (e instanceof errors.JWTExpired) {
			deleteCookie({ cookies })
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
