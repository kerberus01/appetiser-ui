import Vue from 'vue';
import Vuex from 'vuex';

import { events } from './events/event.store';

Vue.use(Vuex);

export default  new Vuex.Store({
    modules: {
      events,
    }
});
