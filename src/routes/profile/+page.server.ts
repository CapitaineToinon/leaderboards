import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import { createCaller } from '$lib/server/trpc'

export const load = (async ({ locals }) => {
	if (!locals.user) {
		throw redirect(307, '/auth/login')
	}

	const trpc = await createCaller({ locals })
	const posts = await trpc.post.myPosts()

	return {
		posts
	}
}) satisfies PageServerLoad
