import rest from '@/api/connection';
rest.interceptors.response.use( (response) => {
    return response
}, (error) => {
        if(error.response){
          console.log('intercept error response', error.response)
          return Promise.reject(error.response.data);
       }else{
        //redirect somwhere no offline mode
        console.log('intercept error response', error);
       }
      return Promise.reject(error);
});
