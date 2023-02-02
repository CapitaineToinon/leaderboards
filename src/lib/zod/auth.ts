import { z } from 'zod';

export const login = z.object({
	email: z.string().email()
});

export const signin = z.object({
	email: z.string().email(),
	name: z.string().min(1)
});
