<template>
  <div id="app"><notifications group="group1" />
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import Notifications from 'vue-notification'
Vue.use(Notifications)

export default {

}
</script>