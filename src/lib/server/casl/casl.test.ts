import { describe, it, expect } from 'vitest'
import { defineAbilityFor } from '$lib/server/casl'
import { subject } from '@casl/ability'
import type { User } from '@prisma/client'
import { faker } from '@faker-js/faker'

describe('casl anon tests', () => {
	it('anon abilities should be correct', async () => {
		const abilities = defineAbilityFor(null)

		expect(abilities.rules).toStrictEqual([
			{ action: 'create', subject: 'User' },
			{ action: 'read', subject: 'User' },
			{ action: 'read', subject: 'Post', conditions: { published: true } }
		])

		expect(abilities.can('create', 'User')).toBe(true)
		expect(abilities.can('create', 'Post')).toBe(false)

		expect(abilities.can('delete', 'User')).toBe(false)
		expect(abilities.can('delete', 'Post')).toBe(false)

		expect(abilities.can('read', 'User')).toBe(true)
		expect(abilities.can('read', 'Post')).toBe(true)

		expect(
			abilities.can(
				'read',
				subject('Post', {
					id: 1,
					authorId: 1,
					title: '',
					content: '',
					published: false
				})
			)
		).toBe(false)

		expect(abilities.can('update', 'User')).toBe(false)
		expect(abilities.can('update', 'Post')).toBe(false)
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

		expect(abilities.can('create', 'User')).toBe(true)
		expect(abilities.can('create', 'Post')).toBe(true)

		expect(
			abilities.can(
				'create',
				subject('Post', {
					id: 1,
					authorId: user.id + 1,
					title: '',
					content: '',
					published: false
				})
			)
		).toBe(false)

		expect(abilities.can('delete', 'User')).toBe(true)
		expect(abilities.can('delete', 'Post')).toBe(true)

		expect(
			abilities.can(
				'delete',
				subject('Post', {
					id: 1,
					authorId: user.id + 1,
					title: '',
					content: '',
					published: false
				})
			)
		).toBe(false)

		expect(abilities.can('read', 'User')).toBe(true)
		expect(abilities.can('read', 'Post')).toBe(true)

		expect(
			abilities.can(
				'read',
				subject('Post', {
					id: 1,
					authorId: user.id,
					title: '',
					content: '',
					published: false
				})
			)
		).toBe(true)

		expect(
			abilities.can(
				'read',
				subject('Post', {
					id: 1,
					authorId: user.id + 1,
					title: '',
					content: '',
					published: false
				})
			)
		).toBe(false)

		expect(abilities.can('update', 'User')).toBe(true)

		expect(
			abilities.can(
				'update',
				subject('User', {
					...user,
					id: user.id + 1
				})
			)
		).toBe(false)

		expect(abilities.can('update', 'Post')).toBe(true)

		expect(
			abilities.can(
				'update',
				subject('Post', {
					id: 1,
					authorId: 2,
					title: '',
					content: '',
					published: false
				})
			)
		).toBe(false)
	})
})
