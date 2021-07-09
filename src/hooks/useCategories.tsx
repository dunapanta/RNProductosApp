import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import productosApi from '../api/productosApi';
import {Categoria, CategoriesResponse} from '../interfaces/appInterfaces';

export const useCategories = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setIsLoading(true);
    const response = await productosApi.get<CategoriesResponse>(
      '/categorias?limite=20',
    );
    setCategories(response.data.categorias);
    setIsLoading(false);
  };

  return {
    categories,
    isLoading,
  };
};
