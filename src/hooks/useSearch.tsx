import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import productosApi from '../api/productosApi';
import {
  Producto,
  SearchResponse,
  SearchResult,
} from '../interfaces/appInterfaces';

export const useSearch = () => {
  const [searchProducts, setSearchProducts] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term.length === 0) {
      setLoading(false);
      return setSearchProducts([]);
    }
    searchingProducts();
  }, [term]);

  const searchingProducts = async () => {
    setLoading(true);
    const resp = await productosApi.get<SearchResponse>(
      `/buscar/productos/${term}`,
    );
    setSearchProducts(resp.data.results);
    //console.log('Data', resp.data);
    setLoading(false);
  };

  return {
    searchProducts,
    loading,
    setTerm,
    term
  };
};
