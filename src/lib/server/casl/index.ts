import type { User, Post } from '@prisma/client'
import type { PrismaQuery, Subjects } from '@casl/prisma'
import { PureAbility, AbilityBuilder } from '@casl/ability'
import { createPrismaAbility } from './prisma'

export function defineAbilityFor(user: User | null) {
	type Actions = 'read' | 'create' | 'update' | 'delete'

	type PrismaSubjects = {
		User: User
		Post: Post
	}

	type AppAbility = PureAbility<[Actions, Subjects<PrismaSubjects>], PrismaQuery>

	const builder = new AbilityBuilder<AppAbility>(createPrismaAbility)
	const { can, build } = builder

	can('create', 'User')

	can('read', 'User')
	can('read', 'Post', { published: true })

	if (user) {
		can('create', 'Post', { authorId: user.id })

		can('delete', 'User', { id: user.id })
		can('delete', 'Post', { authorId: user.id })

		can('read', 'Post', { authorId: user.id })

		can('update', 'User', { id: user.id })
		can('update', 'Post', { authorId: user.id })
	}

	return build()
}
