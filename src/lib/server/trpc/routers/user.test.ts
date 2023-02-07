import { describe, it, expect, vi } from 'vitest'
import { prisma } from '$lib/server/__mocks__/prisma'
import { createCaller as _createCaller } from '$lib/server/trpc'
import { Prisma } from '@prisma/client'
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

describe('trpc user router', () => {
	it('should be able to create a user', async () => {
		const newUser = { id: 1, email: 'user@prisma.io', name: 'Prisma Fan' }
		prisma.user.create.mockResolvedValue(newUser)

		const trpc = await createCaller()
		const user = await trpc.user.create({
			email: newUser.email,
			name: newUser.name
		})

		expect(user).toStrictEqual(newUser)
	})

	it('should throw error if conflict', async () => {
		const newUser = { email: 'user@prisma.io', name: 'Prisma Fan' }

		prisma.user.create.mockImplementation(() => {
			throw new Prisma.PrismaClientKnownRequestError('', {
				code: 'P2002',
				meta: {},
				clientVersion: ''
			})
		})

		const trpc = await createCaller()

		await expect(trpc.user.create(newUser)).rejects.toThrow(TRPCError)
		await expect(trpc.user.create(newUser)).rejects.toThrow('CONFLICT')
	})
})
