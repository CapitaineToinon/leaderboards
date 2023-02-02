import { router, procedure } from '$lib/server/trpc/server';
import { TRPCError } from '@trpc/server';
import { login, signin } from '$lib/zod/auth';
import { Prisma } from '@prisma/client';

export const authRouter = router({
	login: procedure.input(login).mutation(async ({ input, ctx }) => {
		const user = await ctx.db.user.findUnique({
			where: input
		});

		if (!user) {
			throw new TRPCError({
				code: 'FORBIDDEN'
			});
		}

		return user;
	}),
	signin: procedure.input(signin).mutation(async ({ input, ctx }) => {
		try {
			return await ctx.db.user.create({
				data: input
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					throw new TRPCError({
						code: 'CONFLICT'
					});
				}
			}

			throw e;
		}
	})
});
