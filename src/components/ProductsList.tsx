import React from 'react';
import {FlatList, View} from 'react-native';
import {Producto} from '../interfaces/appInterfaces';
import {CardProduct} from './CardProduct';

interface Props {
  products: Producto[];
}

export const ProductsList = ({products}: Props) => {
  return (
    <View>
      <FlatList
        keyExtractor={product => product._id}
        horizontal
        data={products}
        contentContainerStyle={{paddingVertical: 30, paddingLeft: 20}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <CardProduct product={item} index={index} />
        )}
      />
    </View>
  );
};
