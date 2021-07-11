import React, {useContext, useEffect, useState} from 'react';
import {ProductContext} from '../context/ProductContext';
import {Producto} from '../interfaces/appInterfaces';

export const useProductData = (product: Producto) => {
  const [producto, setProducto] = useState<Producto>({
    _id: product._id,
    precio: product.precio,
    nombre: product.nombre,
    descripcion: product.descripcion,
    img: product.img,
    categoria: product.categoria,
    usuario: product.usuario,
    disponible: product.disponible,
  });

  const {products} = useContext(ProductContext);

  useEffect(() => {
    products.map(prod => {
      if (producto._id === prod._id) {
        setProducto(prod);
      }
    });
  }, [products]);

  return {
    producto,
  };
};
