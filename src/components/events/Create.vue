<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
      <div class="sidebar-sticky pt-3">
        <form @submit.prevent="submit" autocomplete="off">
          
          <div class="form-group" :class="{ 'form-group--error': $v.title.$error }">
            <label class="form__label">Title</label>
            <input class="form__input" v-model.trim="title"/>
            <div class="error" v-if="!$v.title.required && $v.title.$error ">Title is required</div>
            <div class="error" v-if="!$v.title.minLength">Title must have at least {{$v.title.$params.minLength.min}} letters.</div>
          </div>


        <div class="form-group" :class="{ 'form-group--error': $v.title.$error }">
          <label class="form__label">Date Range</label>
          <v-date-picker
            value=''
            mode="range"
            :popover="{ visibility: 'click',placement: 'bottom' }">
            v-model="dateRange"
            class="flex-grow">
            <!--Custom Input Slot-->
            <input
              readonly
              id="date"
              slot-scope="{ inputProps, inputEvents, isDragging }"
              :class="[`shadow appearance-none border rounded-l w-full py-2 px-3 ${ isDragging ? 'text-gray-400' : 'text-gray-700' }`, { 'border-red-600': errorMessage }]"
              v-bind="inputProps"
              v-on="inputEvents"
              :update-on-input='false'
              >
          </v-date-picker>
           <div class="error"  v-if="errorMessage">Title is required</div>
        </div>
        

        <div class="form-group pt-3" :class="{ 'form-group--error': $v.title.$error }">
            <button class="button" type="submit" :disabled="submitStatus === true">Submit!</button>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
          </div> 
                   
      </form>
    </div>
  </nav>
</template>

<script>

import Vue from 'vue'
import {mapState, mapActions } from 'vuex';
import Vuelidate from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import VCalendar from "v-calendar";


Vue.use(Vuelidate)
Vue.use(VCalendar)

const container = {
  state: mapState({
    saved_data: state => state.events.saved_data
  }),

  actions: mapActions({
    save: 'events/store',
    query: 'events/query',
  })
}

export default {
  name: 'Create',
  data() {
    return {
      title:'',
      dateRange:{
        start: new Date(),
        end: new Date()  
      },
      days: '',
      submitStatus: false,
    }
  },

  validations: {
    title: {
      required,
      minLength: minLength(3)
    }
  },

  mounted: function () {
        this.loading=false
  },

  computed: {
    ...container.state,
    errorMessage() {
      if (!this.dateRange) return 'Date is required.';
      return '';
    },
  },


  methods: {

    ...container.actions,
    
    submit(e) {
      this.submitStatus = true;
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
      
      let from = this.dateRange.start.getFullYear() + '-' + (this.dateRange.start.getMonth() + 1) +'-'+ this.dateRange.start.getDate();
      let to = this.dateRange.end.getFullYear() + '-' + (this.dateRange.end.getMonth() + 1) +'-'+ this.dateRange.end.getDate();
      let data = {
        title: this.title,
        from: from,
        to: to,
        days:'1,1,1,1,1,1,1'
      }


      let payload = {...e,...data}

      this.save(payload).then(() => {
        if(this.saved_data.error_code) {
          this.$notify({
            group:'group1',
            type: 'error',
            title: 'Error',
            text: 'An error occured!'
          })
        }else{
          this.$notify({
            group:'group1',
            type: 'success',
            title: 'success',
            text: 'Event successfully saved'
          })
          this.query();
        }
        this.submitStatus = false;
      })

      }
    }

  }
}

</script>