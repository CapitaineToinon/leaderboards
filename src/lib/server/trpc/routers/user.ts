import { router, procedure } from '$lib/server/trpc/server'
import { create } from '$lib/zod/user'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'

export const userRouter = router({
	create: procedure.input(create).mutation(async ({ input, ctx }) => {
		try {
			return await ctx.db.user.create({
				data: input
			})
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					throw new TRPCError({
						code: 'CONFLICT'
					})
				}
			}

			throw e
		}
	})
})
