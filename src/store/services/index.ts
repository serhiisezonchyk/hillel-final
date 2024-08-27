import axios from 'axios';

const $host = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export { $host };
