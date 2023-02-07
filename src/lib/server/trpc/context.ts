import type { inferAsyncReturnType } from '@trpc/server'
import { prisma } from '$lib/server/prisma'

export type CreateContextParams = { locals: App.Locals }

export const createContext = async ({ locals }: CreateContextParams) => {
	return {
		...locals,
		db: prisma
	}
}

export type Context = inferAsyncReturnType<typeof createContext>
