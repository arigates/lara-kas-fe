export default defineNuxtConfig({
  ssr: false,
  css: [
    '~/assets/css/global.css',
  ],
  build: {
    transpile: ['konsta'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    // ...
    [
      '@pinia/nuxt', {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia',
          'storeToRefs'
        ],
      }
    ],
  ],
  runtimeConfig: {
    public: {
      siteName: process.env.SITE_NAME,
      baseURL: process.env.BASE_URL,
    }
  }
});
