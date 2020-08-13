import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.VUE_APP_ROOT_API}`,
 headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  //Authorization: `Bearer ${accessToken}`,
  },
});
