import type { inferAsyncReturnType } from '@trpc/server'
import { prisma } from '$lib/server/prisma'

export const createContext = async () => {
	return {
		db: prisma
	}
}

export type Context = inferAsyncReturnType<typeof createContext>
