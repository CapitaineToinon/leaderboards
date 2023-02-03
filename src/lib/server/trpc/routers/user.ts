import { router, procedure } from '$lib/server/trpc/server'
import { create } from '$lib/zod/user'

export const userRouter = router({
	create: procedure.input(create).mutation(async ({ input, ctx }) => {
		return await ctx.db.user.create({
			data: input
		})
	})
})
