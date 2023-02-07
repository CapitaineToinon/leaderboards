import type { Actions, PageServerLoad } from './$types'
import { update as schema } from '$lib/zfd/post'
import { createCaller } from '$lib/server/trpc'
import { error, redirect } from '@sveltejs/kit'
import { TRPCError } from '@trpc/server'
import { parseForm } from '$lib/form'

export const load = (async ({ parent }) => {
	const { canUpdate } = await parent()

	if (!canUpdate) {
		throw error(403, 'FORBIDDEN')
	}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData()
		const form = await parseForm({ schema, formData })

		if (!form.success) {
			return form.fail()
		}

		const trpc = await createCaller({ locals })

		try {
			await trpc.post.update(form.result)
		} catch (e) {
			if (e instanceof TRPCError) {
				if (e.code === 'FORBIDDEN') {
					return form.error(e)
				}
			}

			throw e
		}

		throw redirect(302, `/posts/${form.result.id}`)
	}
} satisfies Actions
