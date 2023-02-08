import { expect, test } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

test.afterAll(async () => {
	await db.$disconnect()
})

test('login form', async ({ page }) => {
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
	expect(response.status()).toBe(200)
	expect(new URL(page.url()).pathname).toBe('/')
})
