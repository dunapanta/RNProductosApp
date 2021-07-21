import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import productosApi from '../api/productosApi';
import {Producto} from '../interfaces/appInterfaces';

export const useSearch = () => {
  const [searchProducts, setSearchProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term.length === 0) {
      return setSearchProducts([]);
    }
    searchingProducts();
  }, [term]);

  const searchingProducts = async () => {
    setLoading(true);
    const resp = await productosApi.get(`/buscar/productos/${term}`);
    setSearchProducts(resp.data);
    //console.log('Data', resp.data);
    setLoading(false);
  };

  return {
    searchProducts,
    loading,
    setTerm,
  };
};
