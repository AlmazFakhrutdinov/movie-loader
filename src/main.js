import Vue from 'vue'
import App from './App.vue'
import { router } from './routes/router'
import Vuex from 'vuex'
import store from './store/index'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import api from './api'

Vue.use(Vuex)
Vue.use(Buefy)
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
