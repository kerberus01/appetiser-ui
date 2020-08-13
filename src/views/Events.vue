<template>
  <div>
  <Header></Header>
 <div class="container-fluid pt-3">
    <div class="row">
      <Create></Create>
      <Calendar></Calendar>
    </div>      
</div>
<Footer></Footer>
</div>
</template>


<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Create from '@/components/events/Create.vue'
import Calendar from '@/components/events/Calendar.vue'

export default {
  name: 'events',
  components: {
    Header,
    Footer,
    Create,
    Calendar
  }
}

</script>