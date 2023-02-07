import type { LayoutServerLoad } from './$types'
import { get as paramsSchema } from '$lib/zod/post'
import { createCaller } from '$lib/server/trpc'
import { error } from '@sveltejs/kit'
import { subject } from '@casl/ability'
import { TRPCError } from '@trpc/server'
import { getHTTPStatusCodeFromError } from '@trpc/server/http'

export const load = (async ({ params, locals }) => {
	const result = paramsSchema.safeParse(params)

	if (!result.success) {
		throw error(404)
	}

	try {
		const trpc = await createCaller({ locals })
		const post = await trpc.post.get(result.data)

		return {
			post,
			canUpdate: locals.abilities.can('update', subject('Post', post)),
			canDelete: locals.abilities.can('delete', subject('Post', post)),
			mine: locals.user?.id === post.authorId
		}
	} catch (e) {
		if (e instanceof TRPCError) {
			if (e.code === 'NOT_FOUND' || e.code === 'FORBIDDEN') {
				throw error(getHTTPStatusCodeFromError(e), {
					message: e.code
				})
			}
		}

		throw e
	}
}) satisfies LayoutServerLoad
