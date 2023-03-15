import { z } from 'zod'

export const create = z.object({
	title: z.string().min(1).max(50),
	content: z.string().min(1),
	published: z.boolean()
})

export const update = create.merge(
	z.object({
		id: z.coerce.number()
	})
)

export const get = z.object({
	id: z.coerce.number()
})
