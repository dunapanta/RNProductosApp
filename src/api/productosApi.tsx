import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://productos-mern-rn.herokuapp.com/api';

const productosApi = axios.create({baseURL});

productosApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  // Si tiene el token todas las peticiones tendran el token incluido
  if (token) {
    config.headers['x-token'] = token;
  }

  return config;
});

export default productosApi;
