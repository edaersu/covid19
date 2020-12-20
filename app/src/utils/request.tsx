import axios from 'axios';
import config from '../config';

const request = axios.create({
  baseURL: config.API_URL,
  headers: {
    get: {
      'Content-Type': 'application/json',
      'x-rapidapi-key': config.X_RAPIDAPI_KEY,
      'x-rapidapi-HOST': config.X_RAPIDAPI_HOST,
    },
    post: {
      'Content-Type': 'application/json',
    },
  },
});

export default request;
