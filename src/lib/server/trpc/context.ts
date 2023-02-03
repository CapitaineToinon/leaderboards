import { PrismaClient } from '@prisma/client'
import type { inferAsyncReturnType } from '@trpc/server'

export const createContext = async () => {
	const db = new PrismaClient()

	return {
		db
	}
}

export type Context = inferAsyncReturnType<typeof createContext>
