import type { Cookies } from '@sveltejs/kit'
import { z } from 'zod'

const cookieName = 'alert_message'

let index = 0

const schema = z.object({
	text: z.string(),
	type: z.enum(['success', 'error', 'info', 'warning']),
	dismissible: z.boolean()
})

const cookieSchema = z
	.array(
		schema.extend({
			id: z.number()
		})
	)
	.optional()
	.default([])

export type Alert = z.infer<typeof schema>
export type Alerts = z.infer<typeof cookieSchema>

const options = {
	path: '/',
	httpOnly: true,
	sameSite: 'strict',
	secure: import.meta.env.PROD
} as const

export function get({ cookies }: { cookies: Cookies }) {
	const cookie = cookies.get(cookieName)

	if (!cookie) {
		return []
	}

	try {
		return cookieSchema.parse(JSON.parse(cookie))
	} catch (error) {
		return []
	} finally {
		deleteCookie({ cookies })
	}
}

export function add({
	cookies,
	...alert
}: { text: Alert['text']; type?: Alert['type']; dismissible?: Alert['dismissible'] } & {
	cookies: Cookies
}) {
	const messages = get({ cookies })
	messages.push({
		id: index++,
		text: alert.text,
		type: alert.type ?? 'success',
		dismissible: alert.dismissible ?? false
	})
	const cookie = JSON.stringify(messages)
	return cookies.set(cookieName, cookie, options)
}

function deleteCookie({ cookies }: { cookies: Cookies }) {
	return cookies.delete(cookieName, options)
}
