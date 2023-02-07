// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { User } from '@prisma/client'
import type { JWTPayload } from 'jose'
import type { AppAbility } from '$lib/server/casl'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: (User & JWTPayload) | null
			abilities: AppAbility
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
