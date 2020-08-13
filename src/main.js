require('./assets/sass/app.scss')

import Vue from 'vue'
import App from './App.vue'
import router from '@/routes/'
import store from '@/store/'
import { BootstrapVue } from 'bootstrap-vue'

import response from  '@/interceptors/response.interceptor.js'
import request from '@/interceptors/request.interceptor.js'

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  request,
  response,
  render: h => h(App),
}).$mount('#app')
