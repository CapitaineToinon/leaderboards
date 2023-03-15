import { error } from '@sveltejs/kit'
import { createCaller } from '$lib/server/trpc'

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw error(401)
	}

	const trpc = await createCaller({ locals })
	const posts = await trpc.post.myPosts()

	return {
		posts
	}
}
