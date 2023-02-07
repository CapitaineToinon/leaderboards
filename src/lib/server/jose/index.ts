import type { User } from '@prisma/client'
import { type JWTPayload, SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode('secret') // todo change
const alg = 'HS256'

export async function sign(user: User) {
	return await new SignJWT(user).setProtectedHeader({ alg }).setExpirationTime('2h').sign(secret)
}

export async function verify(token: string) {
	const { payload } = await jwtVerify(token, secret)
	return payload as User & JWTPayload
}
