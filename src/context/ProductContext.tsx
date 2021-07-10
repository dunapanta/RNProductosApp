import React, {createContext} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import productosApi from '../api/productosApi';
import {Producto, ProductsResponse} from '../interfaces/appInterfaces';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (
    categoryId: string,
    productName: string,
    productPrice: number,
    productDescription: string,
    //ProductImg: string,
  ) => Promise<void>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
    productPrice: number,
    productDescription: string,
    //ProductImg: string,
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
  const addProduct = async (
    categoryId: string,
    productName: string,
    productPrice: number,
    productDescription: string,
  ) => {
    console.log('addProduct');
    console.log({
      categoryId,
      productName,
      productPrice,
      productDescription,
    });
  };
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
    productPrice: number,
    productDescription: string,
  ) => {
    console.log('updateProduct');
    console.log({
      categoryId,
      productName,
      productId,
      productPrice,
      productDescription,
    });
  };
  const deleteProduct = async (id: string) => {};

  const loadProductById = async (id: string): Promise<Producto> => {
    const resp = await productosApi.get<Producto>(`/productos/${id}`);
    return resp.data;
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
