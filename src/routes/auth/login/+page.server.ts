import { login as schema } from '$lib/zfd/auth'
import { parseForm } from '$lib/form'
import { createCaller } from '$lib/server/trpc'
import { TRPCError } from '@trpc/server'
import { redirect } from '@sveltejs/kit'
import { sign } from '$lib/server/jose'
import * as authCookie from '$lib/server/cookies/auth'
import * as alert from '$lib/server/cookies/alert'

export const load = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/')
	}
}

export const actions = {
	default: async ({ request, cookies, locals }) => {
		const formData = await request.formData()
		const form = await parseForm({ schema, formData })

		if (!form.success) {
			return form.fail()
		}

		const trpc = await createCaller({ locals })

		try {
			const user = await trpc.auth.login(form.result)
			const token = await sign(user)

			authCookie.setCookie({
				cookies,
				token
			})

			alert.add({
				text: 'You have been logged in.',
				dismissible: true,
				cookies
			})

			throw redirect(302, '/')
		} catch (e) {
			if (e instanceof TRPCError) {
				if (e.code === 'FORBIDDEN') {
					return form.error(e)
				}
			}

			throw e
		}
	}
}
