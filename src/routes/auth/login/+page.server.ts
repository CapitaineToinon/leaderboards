import type { Actions, PageServerLoad } from './$types'
import { login as schema } from '$lib/zfd/auth'
import { parseForm } from '$lib/form'
import { createCaller } from '$lib/server/trpc'
import { TRPCError } from '@trpc/server'
import { redirect } from '@sveltejs/kit'
import { sign } from '$lib/server/jose'

export const load = (async ({ locals }) => {
	if (locals.user) {
		throw redirect(307, '/')
	}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData()
		const form = await parseForm({ schema, formData })

		if (!form.success) {
			return form.fail()
		}

		const trpc = await createCaller()

		try {
			const user = await trpc.auth.login(form.result)
			const token = await sign(user)

			cookies.set('auth_token', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: import.meta.env.PROD
			})

			throw redirect(307, '/')
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
