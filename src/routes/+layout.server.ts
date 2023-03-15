import * as alert from '$lib/server/cookies/alert'

export const load = async ({ locals, cookies }) => {
	const alerts = alert.get({
		cookies
	})

	return {
		alerts,
		user: locals.user
	}
}
