import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HeaderProducts} from '../components/HeaderProducts';
import {SearchInput} from '../components/SearchInput';

import Colors from '../constants/Colors';
import {ProductContext} from '../context/ProductContext';

export const ProductsScreen = () => {
  const {products, loadProducts} = useContext(ProductContext);

  const {top} = useSafeAreaInsets();
  const categorias = ['Todos', 'Populares', 'Más Vendidos', 'Mejor Puntuados'];
  console.log(top);
  return (
    <View style={{top: top + 5, ...styles.container}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <HeaderProducts />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchInput />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
