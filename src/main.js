import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import App from './App.vue'
import router from './router'
import './style/tailwind.css'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueCompositionAPI)

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
