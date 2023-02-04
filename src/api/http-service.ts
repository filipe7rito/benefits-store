import axios from 'axios';

const { VITE_API_DOMAIN } = import.meta.env;

const httpClient = axios.create({
  baseURL: VITE_API_DOMAIN,
});

export default httpClient;
