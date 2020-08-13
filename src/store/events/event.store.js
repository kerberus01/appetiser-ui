
import { _resource } from '@/api/_resource'

const state = {
    data: false,
    saved_data: false,
};

const actions = {

 async query({commit}, query) {
      await  _resource.query('events',query).then(response=>{
           if(response){
             commit('DATA_FETCHED', response)
           }
         });
      },
 async  store({commit}, payload){
     
     await _resource.save('event', payload).then(response=>{    
           if(response){
             commit('DATA_SAVED', response)
           }
         });
   },

};

const mutations = {
     DATA_FETCHED(state, payload) {
        state.data = payload
     },
     DATA_SAVED(state,payload){
       state.saved_data = payload
     }

};

const getters = {
   current: (state) => (id) => {
       return state.data.filter(data =>{
                  if(data.id === id){
                    state.selected = data
                    return data
                  }
              });
    }
};



export const events = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};