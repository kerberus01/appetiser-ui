import rest from '@/api/connection';

rest.interceptors.request.use((config) => {

    return config
  },
  (error) => {
  
    return Promise.reject(error)
  }
)

