<template>
<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
  <div class="table-responsive">
    <div class="my-3 p-3 bg-white rounded shadow-sm">

  <v-calendar :rows="6"  class="custom_calendar" style="max-width: 100%;" :first-day-of-week="2" ref="calendar" is-expanded  :attributes='calendar.attributes'>
    
    <template slot='day-content' slot-scope="props">
      <div class="day-cell" v-if="props.day.inMonth">
        <span :class="props.day.isToday ? 'day-today' : ''">{{props.day.day}}</span>
    
        <span v-if="props.attributes !== undefined">
        
        <div v-for="dayEvent in props.attributes" :key="dayEvent.key">
          <span class="event-badge badge badge-pill">
               {{dayEvent.customData.title}}
          </span>
        </div>
             
        </span>
      </div>
    </template>
  </v-calendar>

    </div>
  </div>
</main>
</template>

<script>

import {mapState, mapActions } from 'vuex';

const container = {
  state: mapState({
    events_data: state => state.events.data
  }),
  actions: mapActions({
    query: 'events/query',
  })
}

export default {
  name: 'Calendar',
  props: [],
  data() {
    return {
      data: [],
      submitStatus: false,
      calendar: {
        attributes:[]
      }
    }
  },

  created() { 
    this.query()
  },

  methods: {

    ...container.actions,
    isToday: function (event){
      return event; 
    },
    
    debug (data) {
      console.log(data)
    }

  },

  computed: {
    ...container.state,
  },

  watch: {
    events_data: function(value){
      for (var i=0; i<value.data.length; i++) {
          var dates = [{
            'start': value.data[i].from + ' 00:00:00',
            'end': value.data[i].to + ' 00:00:00',
          }]
          this.calendar.attributes.push({
            dates: dates,
            customData: value.data[i],
            order: 0
          })
      }
      
    }

  }
}

</script>