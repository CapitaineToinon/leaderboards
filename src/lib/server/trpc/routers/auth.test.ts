import { describe, it, expect, vi } from 'vitest'
import { prisma } from '$lib/server/__mocks__/prisma'
import { createCaller as _createCaller } from '$lib/server/trpc'
import { TRPCError } from '@trpc/server'
import { defineAbilityFor } from '$lib/server/casl'

vi.mock('$lib/server/prisma')

async function createCaller() {
	return await _createCaller({
		locals: {
			user: null,
			abilities: defineAbilityFor(null)
		}
	})
}

describe('trpc auth router', () => {
	it('should be able to login with existing email', async () => {
		const user = { id: 1, email: 'user@prisma.io', name: 'Prisma Fan' }
		prisma.user.findUnique.mockResolvedValue(user)

		const trpc = await createCaller()

		const result = await trpc.auth.login({
			email: user.email
		})

		expect(result).toStrictEqual(null)
	})

	it('should not be able to login with unknown email', async () => {
		prisma.user.findUnique.mockResolvedValue(null)

		const trpc = await createCaller()

		const promise = trpc.auth.login({
			email: 'nofount@prisma.io'
		})

		await expect(promise).rejects.toThrow(TRPCError)
		await expect(promise).rejects.toThrow('FORBIDDEN')
	})
})
