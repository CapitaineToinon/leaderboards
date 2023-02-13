import type { Actions } from './$types'
import { create as schema } from '$lib/zfd/post'
import { parseForm } from '$lib/form'
import { createCaller } from '$lib/server/trpc'
import { TRPCError } from '@trpc/server'
import { redirect } from '@sveltejs/kit'

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData()
		const form = await parseForm({ schema, formData })

		if (!form.success) {
			return form.fail()
		}

		const trpc = await createCaller({ locals })

		try {
			const post = await trpc.post.createMine(form.result)
			throw redirect(303, `/posts/${post.id}`)
		} catch (e) {
			if (e instanceof TRPCError) {
				if (e.code === 'FORBIDDEN') {
					return form.error(e)
				}
			}

			throw e
		}
	}
} satisfies Actions
