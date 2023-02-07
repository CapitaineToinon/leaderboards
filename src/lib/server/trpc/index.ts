import { type CreateContextParams, createContext } from './context'
import { appRouter } from './routers'

export async function createCaller(params: CreateContextParams) {
	const context = await createContext(params)
	return appRouter.createCaller(context)
}
