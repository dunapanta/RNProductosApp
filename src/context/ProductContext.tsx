import React, {createContext} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import productosApi from '../api/productosApi';
import {Producto, ProductsResponse} from '../interfaces/appInterfaces';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<void>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>; //TODO: cambiar Any
};

export const ProductContext = createContext({} as ProductsContextProps);

export const ProductProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const resp = await productosApi.get<ProductsResponse>(
      '/productos?limite=50',
    );
    setProducts([...products, ...resp.data.productos]);
  };
  const addProduct = async (categoryId: string, productName: string) => {};
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {};
  const deleteProduct = async (id: string) => {};
  const loadProductById = async (id: string) => {
    throw new Error('Not implemented');
  };
  const uploadImage = async (data: any, id: string) => {};

  return (
    <ProductContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductContext.Provider>
  );
};