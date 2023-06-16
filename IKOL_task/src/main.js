import './assets/main.css'
import './assets/variables.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from "vue-i18n"

import en from "./locales/en.json"
import pl from "./locales/pl.json"


const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: { pl, en },
})

createApp(App).use(i18n).mount('#app')