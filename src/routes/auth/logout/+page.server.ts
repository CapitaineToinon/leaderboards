import type { Actions, PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load = (async ({ locals }) => {
	return {
		user: locals.user
	}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('auth_token', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: import.meta.env.PROD
		})

		throw redirect(307, '/auth/login')
	}
} satisfies Actions
