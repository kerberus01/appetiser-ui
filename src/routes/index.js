import Vue from 'vue'
import Router from 'vue-router'

import Events from '@/views/Events.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'events',
      component: Events
     },
     {
      path: '/events',
      name: 'events',
      component: Events
     }
  ]
})
