import { createContext } from './context';
import { appRouter } from './routers';

export async function createCaller() {
	const context = await createContext();
	return appRouter.createCaller(context);
}
