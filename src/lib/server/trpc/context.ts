import type { inferAsyncReturnType } from '@trpc/server'
import { prisma } from '$lib/server/prisma'
import { defineAbilityFor } from '../casl'

export const createContext = async () => {
	const abilities = defineAbilityFor(null)

	return {
		abilities,
		db: prisma
	}
}

export type Context = inferAsyncReturnType<typeof createContext>
