import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {FilterList} from '../components/FilterList';
import {HeaderProducts} from '../components/HeaderProducts';
import {LastProductsList} from '../components/LastProductsList';
import {ProductsList} from '../components/ProductsList';
import {SearchInput} from '../components/SearchInput';
import {ProductContext} from '../context/ProductContext';

export const ProductsScreen = () => {
  const {products} = useContext(ProductContext);

  const {top} = useSafeAreaInsets();

  return (
    <View style={{top: top + 5, ...styles.container}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <HeaderProducts />
      <SearchInput />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FilterList />
        <ProductsList products={products} />
        <LastProductsList products={products} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
