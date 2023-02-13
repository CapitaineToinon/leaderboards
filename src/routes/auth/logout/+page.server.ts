import type { Actions, PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import * as authCookie from '$lib/server/cookies/auth'
import * as alert from '$lib/server/cookies/alert'

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

		alert.add({
			text: 'You have been logged out.',
			dismissible: true,
			cookies
		})

		throw redirect(302, '/auth/login')
	}
} satisfies Actions
