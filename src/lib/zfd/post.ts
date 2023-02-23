import { zfd } from 'zod-form-data'
import { create as zodCreate, get as zodGet, update as zodUpdate } from '$lib/zod/post'

export const create = zfd.formData({
	title: zodCreate.shape.title,
	content: zodCreate.shape.content,
	published: zfd.checkbox()
})

export const update = zfd.formData({
	id: zodUpdate.shape.id,
	title: zodUpdate.shape.title,
	content: zodUpdate.shape.content,
	published: zfd.checkbox()
})

export const get = zfd.formData(zodGet)
