import type { z } from 'zod'
import { fail as kitFail } from '@sveltejs/kit'
import { enhance as _enhance } from '$app/forms'
import { derived, writable, get } from 'svelte/store'
import { getHTTPStatusCodeFromError } from '@trpc/server/http'
import type { TRPCError } from '@trpc/server'

type FormState<T extends z.AnyZodObject> = {
	success: boolean
	values: { [k in keyof z.infer<T>]: string }
	fieldErrors: z.inferFlattenedErrors<T>['fieldErrors']
	formErrors: z.inferFlattenedErrors<T>['formErrors']
}

type ParseResult<T extends z.AnyZodObject> = {
	state: FormState<T>
} & (
	| {
			success: true
			result: z.infer<T>
			json: <K>(data: K) => {
				data: K
				state: FormState<T>
			}
			error: (e: TRPCError) => ReturnType<
				typeof kitFail<{
					error: typeof e.code
					state: FormState<T>
				}>
			>
	  }
	| {
			success: false
			fail: () => ReturnType<
				typeof kitFail<{
					error: undefined
					state: FormState<T>
				}>
			>
	  }
)

export async function parseForm<T extends z.AnyZodObject>({
	schema,
	formData
}: {
	schema: z.ZodEffects<T>
	formData: FormData
}): Promise<ParseResult<T>> {
	const result = await schema.safeParseAsync(formData)

	const names = schema.innerType().keyof().Values as ReturnType<T['keyof']>['Values']
	const values = Object.keys(names).reduce((acc, name) => {
		return {
			...acc,
			[name]: !result.success ? formData.get(name)?.toString() ?? '' : ''
		}
	}, {} as { [k in keyof z.infer<T>]: string })

	if (result.success) {
		const state = {
			success: true,
			values,
			fieldErrors: {},
			formErrors: []
		}

		return {
			success: true,
			result: result.data,
			state,
			json(data) {
				return {
					data,
					state
				}
			},
			error(e) {
				return kitFail(getHTTPStatusCodeFromError(e), {
					error: e.code,
					state
				})
			}
		}
	}

	const { fieldErrors, formErrors } = result.error.flatten()

	const state = {
		success: result.success,
		values,
		fieldErrors,
		formErrors
	}

	return {
		success: false,
		state,
		fail() {
			return kitFail(400, {
				error: undefined,
				state
			})
		}
	}
}

export function useForm<
	T extends z.AnyZodObject,
	F extends {
		state: FormState<T>
	}
>({
	schema,
	form,
	onSubmitted
}: {
	schema: z.ZodEffects<T>
	form?: F | null
	onSubmitted?: (form: F) => void
}) {
	const names = schema.innerType().keyof().Values as ReturnType<T['keyof']>['Values']
	const submitted = writable(false)
	const touched = writable(false)
	const success = writable(form?.state?.success ?? false)
	const fieldErrors = writable(form?.state?.fieldErrors)
	const formErrors = writable(form?.state?.formErrors)

	const values = writable(
		Object.keys(names).reduce((acc, name) => {
			return {
				...acc,
				[name]: form?.state?.values?.[name] ?? ''
			}
		}, {} as { [k in keyof z.infer<T>]: string })
	)

	const wrapperValues: typeof values = {
		subscribe: values.subscribe,
		set: (value) => {
			touched.set(true)
			values.set(value)
		},
		update: (fn) => {
			touched.set(true)
			values.update(fn)
		}
	}

	async function validate(formData: FormData) {
		const { state } = await parseForm({ schema, formData })
		fieldErrors.set(state.fieldErrors)
		formErrors.set(state.formErrors)
		success.set(state.success)
		return state.success
	}

	function enhance(node: HTMLFormElement) {
		const unsubscribe = values.subscribe(async () => {
			if (!get(submitted)) return
			const data = new FormData(node)
			await validate(data)
		})

		const { destroy } = _enhance(node, async ({ data, cancel }) => {
			submitted.set(true)
			const ok = await validate(data)

			if (!ok) {
				cancel()
			}

			return async ({ result, update }) => {
				await update({
					reset: true
				})

				if (result.type === 'success') {
					onSubmitted?.(result.data as F)
				}

				submitted.set(false)
				touched.set(false)
				success.set(true)
			}
		})

		return {
			destroy() {
				destroy()
				unsubscribe()
			}
		}
	}

	return {
		names,
		fieldErrors,
		formErrors,
		values: wrapperValues,
		enhance,
		touched: derived(touched, ($touched) => $touched),
		submitted: derived(submitted, ($submitted) => $submitted),
		success: derived(success, ($success) => $success)
	}
}
