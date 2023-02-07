import { t } from '$lib/server/trpc/server'
import { TRPCError } from '@trpc/server'

export const auth = t.middleware(async ({ ctx, next }) => {
	if (ctx.user === null) {
		throw new TRPCError({
			code: 'UNAUTHORIZED'
		})
	}

	return next({
		ctx: {
			...ctx,
			user: ctx.user
		}
	})
})
