import type { User } from '@prisma/client'
import { describe, it, expect } from 'vitest'
import { defineAbilityFor } from '$lib/server/casl'
import { faker } from '@faker-js/faker'

describe('casl anon tests', () => {
	it('anon abilities should be correct', async () => {
		const abilities = defineAbilityFor(null)

		expect(abilities.rules).toStrictEqual([
			{ action: 'create', subject: 'User' },
			{ action: 'read', subject: 'User' },
			{ action: 'read', subject: 'Post', conditions: { published: true } }
		])
	})

	it('user abilities should be correct', async () => {
		const user: User = {
			id: faker.datatype.number({ min: 1, max: 1000 }),
			email: faker.internet.email(),
			name: faker.internet.userName()
		}

		const abilities = defineAbilityFor(user)

		expect(abilities.rules).toStrictEqual([
			{ action: 'create', subject: 'User' },
			{ action: 'read', subject: 'User' },
			{ action: 'read', subject: 'Post', conditions: { published: true } },
			{ action: 'create', subject: 'Post', conditions: { authorId: user.id } },
			{ action: 'delete', subject: 'User', conditions: { id: user.id } },
			{ action: 'delete', subject: 'Post', conditions: { authorId: user.id } },
			{ action: 'read', subject: 'Post', conditions: { authorId: user.id } },
			{ action: 'update', subject: 'User', conditions: { id: user.id } },
			{ action: 'update', subject: 'Post', conditions: { authorId: user.id } }
		])
	})
})
