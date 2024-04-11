import { nodePolyfills } from 'vite-plugin-node-polyfills'
import packageJSON from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	vite: {
		plugins: [nodePolyfills()], // only for @vue-dapp/coinbase
	},
	components: [
		{
			path: '~/components',
			pathPrefix: false, // auto-import components based only on its name, not path
		},
	],
	modules: [
		'@vue-dapp/nuxt',
		'@nuxtjs/tailwindcss',
		[
			'@pinia/nuxt',
			{
				autoImports: ['defineStore', 'storeToRefs'],
			},
		],
		'@pinia-plugin-persistedstate/nuxt',
		'@vueuse/nuxt',
		'nuxt-icon',
	],
	imports: {
		dirs: ['store'],
	},
	tailwindcss: {
		cssPath: '~/styles/tailwind.css',
		configPath: 'tailwind.config',
		injectPosition: 'last', // https://tailwindcss.nuxtjs.org/getting-started/options#injectposition
	},
	css: ['~/styles/main.scss'],
	runtimeConfig: {
		public: {
			apiBase: '',
		},
	},
	app: {
		head: {
			title: 'Vue Dapp',
			meta: [
				{
					charset: 'utf-8',
				},
				{
					name: 'viewport',
					content:
						'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover',
					// Disable Auto Zoom in Input "Text" tag https://stackoverflow.com/a/13706151/19799243
				},
				{
					name: 'description',
					content: packageJSON.description,
				},
				{
					name: 'author',
					content: packageJSON.author,
				},
			],
			link: [{ rel: 'icon', href: '/favicon.ico' }],
		},
	},
})
