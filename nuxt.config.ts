// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/styles/tailwind.css', '~/assets/styles/main.css'],

  modules: ['@pinia/nuxt', '@element-plus/nuxt'],

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },

  pinia: {
    autoImports: [ 
      'defineStore',  
      ['defineStore', 'definePiniaStore'], 
    ],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
