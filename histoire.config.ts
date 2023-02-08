import { defineConfig } from 'histoire'
import { HstSvelte } from '@histoire/plugin-svelte'
import { resolve } from 'path'

const rootDir = resolve(__dirname)

export const config = defineConfig({
	plugins: [HstSvelte()],
	setupFile: resolve(rootDir, 'src/histoire-setup.ts'),
	viteIgnorePlugins: ['vite-plugin-sveltekit-setup', 'vite-plugin-sveltekit-compile'],
	vite: {
		resolve: {
			alias: {
				'$app/forms': resolve(rootDir, 'histoire/mocks/$app/forms')
			}
		}
	}
})

export default config
