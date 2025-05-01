import tailwindcss from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', 'element-plus/dist/index.css'],
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    transpile: ['element-plus/es'],
  },
});
