import { router } from '../server';
import { authRouter } from './auth';
import { userRouter } from './user';

export const appRouter = router({
	auth: authRouter,
	user: userRouter
});
