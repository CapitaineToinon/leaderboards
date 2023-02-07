import { router } from '../server'
import { authRouter } from './auth'
import { postRouter } from './post'
import { userRouter } from './user'

export const appRouter = router({
	auth: authRouter,
	post: postRouter,
	user: userRouter
})
