import { z } from 'zod'

export const create = z.object({
	email: z.string().email(),
	name: z.string().min(1)
})
