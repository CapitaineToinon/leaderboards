import { router, procedure } from '$lib/server/trpc/server'
import { auth } from '$lib/server/trpc/middlewares/auth'
import { create, get, update } from '$lib/zod/post'
import { subject } from '@casl/ability'
import { TRPCError } from '@trpc/server'

export const postRouter = router({
	get: procedure.input(get).query(async ({ ctx, input }) => {
		const post = await ctx.db.post.findUnique({
			where: input,
			include: {
				author: true
			}
		})

		if (!post) {
			throw new TRPCError({
				code: 'NOT_FOUND'
			})
		}

		if (!ctx.abilities.can('read', subject('Post', post))) {
			throw new TRPCError({
				code: 'FORBIDDEN'
			})
		}

		return post
	}),
	update: procedure
		.use(auth)
		.input(update)
		.mutation(async ({ ctx, input }) => {
			const post = await ctx.db.post.findUnique({
				where: {
					id: input.id
				}
			})

			if (!post) {
				throw new TRPCError({
					code: 'NOT_FOUND'
				})
			}

			if (!ctx.abilities.can('update', subject('Post', post))) {
				throw new TRPCError({
					code: 'FORBIDDEN'
				})
			}

			return await ctx.db.post.update({
				where: {
					id: input.id
				},
				data: input
			})
		}),
	delete: procedure
		.use(auth)
		.input(get)
		.mutation(async ({ ctx, input }) => {
			const post = await ctx.db.post.findUnique({
				where: input
			})

			if (!post) {
				throw new TRPCError({
					code: 'NOT_FOUND'
				})
			}

			if (!ctx.abilities.can('delete', subject('Post', post))) {
				throw new TRPCError({
					code: 'FORBIDDEN'
				})
			}

			return await ctx.db.post.delete({
				where: input
			})
		}),
	recentPosts: procedure.query(async ({ ctx }) => {
		return await ctx.db.post.findMany({
			where: {
				published: true
			},
			take: 10
		})
	}),
	myPosts: procedure.use(auth).query(async ({ ctx }) => {
		return await ctx.db.post.findMany({
			where: {
				authorId: ctx.user.id
			}
		})
	}),
	createMine: procedure
		.use(auth)
		.input(create)
		.mutation(async ({ ctx, input }) => {
			const data = {
				...input,
				authorId: ctx.user.id
			}

			if (
				!ctx.abilities.can(
					'create',
					subject('Post', {
						id: 0,
						...data
					})
				)
			) {
				throw new TRPCError({
					code: 'FORBIDDEN'
				})
			}

			return await ctx.db.post.create({
				data
			})
		})
})
