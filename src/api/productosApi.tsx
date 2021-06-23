import axios from 'axios';

const baseURL = 'https://productos-mern-rn.herokuapp.com/api';

const productosApi = axios.create({baseURL});

export default productosApi;
