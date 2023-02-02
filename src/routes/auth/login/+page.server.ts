import type { Actions } from './$types';
import { login as schema } from '$lib/zfd/auth';
import { parseForm } from '$lib/form';
import { createCaller } from '$lib/server/trpc';
import { TRPCError } from '@trpc/server';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await parseForm({ schema, formData });

		if (!form.success) {
			return form.fail();
		}

		const trpc = await createCaller();

		try {
			const user = await trpc.auth.login(form.result);
			return form.json(user);
		} catch (e) {
			if (e instanceof TRPCError) {
				if (e.code === 'FORBIDDEN') {
					return form.error(e);
				}
			}

			throw e;
		}
	}
} satisfies Actions;
