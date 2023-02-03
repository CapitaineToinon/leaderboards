import type { Context } from './context'
import { initTRPC } from '@trpc/server'

export const t = initTRPC.context<Context>().create({
	isDev: import.meta.env.DEV,
	isServer: true
})

export const procedure = t.procedure
export const router = t.router
