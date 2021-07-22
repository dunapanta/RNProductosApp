import React, {useState, useEffect, createContext} from 'react';

import {ImagePickerResponse} from 'react-native-image-picker';

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
  ) => Promise<Producto | undefined>;
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
    //setProducts([...products, ...resp.data.productos]);
    setProducts([...resp.data.productos]);
  };

  const addProduct = async (
    categoryId: string,
    productName: string,
    productPrice: number,
    productDescription: string,
  ) => {
    try {
      const resp = await productosApi.post<Producto>('/productos', {
        nombre: productName,
        precio: productPrice,
        descripcion: productDescription,
        categoria: categoryId,
      });
      setProducts([...products, resp.data]);
      return resp.data;
    } catch (err) {
      console.log('ERROR NOOOO', err.response.data);
    }
  };

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
    productPrice: number,
    productDescription: string,
  ) => {
    try {
      const resp = await productosApi.put<Producto>(`/productos/${productId}`, {
        nombre: productName,
        precio: productPrice,
        descripcion: productDescription,
        categoria: categoryId,
      });
      setProducts(
        products.map(prod => {
          return prod._id === productId ? resp.data : prod;
        }),
      );
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const deleteProduct = async (id: string) => {};

  const loadProductById = async (id: string): Promise<Producto> => {
    const resp = await productosApi.get<Producto>(`/productos/${id}`);
    return resp.data;
  };

  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    //console.log('uploadImage', id);
    const photoToUpload = {
      uri: data.assets[0].uri,
      type: data.assets[0].type,
      name: data.assets[0].fileName,
    };

    const fromData = new FormData();
    fromData.append('archivo', photoToUpload);

    try {
      const resp = productosApi.put(`/uploads/productos/${id}`, fromData);
      return (await resp).data;
    } catch (err) {
      console.log(err);
    }
  };

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
