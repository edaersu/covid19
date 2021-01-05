import axios from 'axios';
import config from '../config';

const request = axios.create({
  baseURL: config.API_URL,
  headers: {
    get: {
      'Content-Type': 'application/json',
    },
    post: {
      'Content-Type': 'application/json',
    },
  },
});

export default request;
