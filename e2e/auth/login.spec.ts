import { expect, test } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const javaScriptEnabled = [true, false]
const db = new PrismaClient()

test.afterAll(async () => {
	await db.$disconnect()
})

javaScriptEnabled.forEach((javaScriptEnabled) => {
	const state = javaScriptEnabled ? 'enabled' : 'disabled'

	test(`login form with javascript ${state}`, async ({ browser }) => {
		const context = await browser.newContext({ javaScriptEnabled })
		const page = await context.newPage()

		const status = javaScriptEnabled ? 200 : 302
		const email = faker.internet.email()
		const name = faker.internet.userName()

		await db.user.create({
			data: {
				email,
				name
			}
		})

		await page.goto('/auth/login')

		const login = page.waitForResponse((resp) => {
			return new URL(resp.url()).pathname === '/auth/login' && resp.request().method() === 'POST'
		})

		await page.getByTestId('email').type(email)
		await page.getByTestId('submit').click()
		await page.waitForLoadState('networkidle')

		const response = await login
		expect(response.status()).toBe(status)
		expect(new URL(page.url()).pathname).toBe('/')
	})
})
