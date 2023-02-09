import type { Actions, PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import * as authCookie from '$lib/server/cookies/auth'
import * as flash from '$lib/server/cookies/flash'

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

		flash.setCookie({
			message: 'You have been logged out.',
			cookies
		})

		throw redirect(302, '/auth/login')
	}
} satisfies Actions
