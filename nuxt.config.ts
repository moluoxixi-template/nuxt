import tailwindcss from "@tailwindcss/vite";
import {generateMenu} from './utils/generate-menu'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    generate:{
        routes: generateMenu()
    },
    modules: [
        '@nuxt/eslint',
    ],
    vite: {
        plugins: [
            tailwindcss(),
        ]
    }
})