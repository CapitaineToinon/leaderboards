import { signin as schema } from '$lib/zfd/auth'
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
			await trpc.auth.signin(form.result)
			throw redirect(302, '/auth/login')
		} catch (e) {
			if (e instanceof TRPCError) {
				if (e.code === 'CONFLICT') {
					return form.error(e)
				}
			}

			throw e
		}
	}
}
