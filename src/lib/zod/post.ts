import { z } from 'zod'

export const create = z.object({
	title: z.string(),
	content: z.string(),
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
