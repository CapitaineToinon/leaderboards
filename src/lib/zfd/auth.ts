import { zfd } from 'zod-form-data';
import { login as zodLogin, signin as zodSignin } from '$lib/zod/auth';

export const login = zfd.formData(zodLogin);
export const signin = zfd.formData(zodSignin);
