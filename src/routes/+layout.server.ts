import type { LayoutServerLoad } from './$types'
import * as flash from '$lib/server/cookies/flash'

export const load = (async ({ locals, cookies }) => {
	const flashMessage = flash.getCookie({
		cookies
	})

	return {
		flashMessage,
		user: locals.user
	}
}) satisfies LayoutServerLoad
