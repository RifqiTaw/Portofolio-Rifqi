import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Timeline from 'primevue/timeline'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue)
  nuxtApp.vueApp.component('Timeline', Timeline)
})
