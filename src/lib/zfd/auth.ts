import { zfd } from 'zod-form-data'
import { login as zodLogin, signin as zodSignin } from '$lib/zod/auth'

export const login = zfd.formData({
	email: zodLogin.shape.email
})

export const signin = zfd.formData({
	email: zodSignin.shape.email,
	name: zodSignin.shape.name
})
