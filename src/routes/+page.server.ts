import type { PageServerLoad } from './$types'
import { createCaller } from '$lib/server/trpc'

export const load = (async ({ locals }) => {
	const trpc = await createCaller({ locals })
	const posts = await trpc.post.recentPosts()
	return { posts }
}) satisfies PageServerLoad
