import type { Actions, PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import * as authCookie from '$lib/server/cookies/auth'

export const load = (async ({ locals }) => {
	return {
		user: locals.user
	}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ cookies }) => {
		authCookie.deleteCookie({
			cookies
		})

		throw redirect(307, '/auth/login')
	}
} satisfies Actions
