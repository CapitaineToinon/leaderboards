import type { UserConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname)

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: [
			{
				find: 'zod-form-data',
				replacement: resolve(projectRootDir, 'node_modules/zod-form-data/dist/index.esm.js')
			}
		]
	}
}

export default config
