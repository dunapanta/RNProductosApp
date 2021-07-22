import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useSearch} from '../hooks/useSearch';
import {FilterList} from '../components/FilterList';
import {HeaderProducts} from '../components/HeaderProducts';
import {LastProductsList} from '../components/LastProductsList';
import {ProductsList} from '../components/ProductsList';
import {SearchInput} from '../components/SearchInput';
import {ProductContext} from '../context/ProductContext';
import Colors from '../constants/Colors';
import {SearchList} from './SearchList';

export const ProductsScreen = () => {
  const {products} = useContext(ProductContext);

  const {top} = useSafeAreaInsets();
  const {searchProducts, loading, setTerm} = useSearch();

  console.log(searchProducts);

  return (
    <View style={{top: top + 5, ...styles.container}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <HeaderProducts />
      <SearchInput onDebounce={value => setTerm(value)} />
      {loading ? (
        <ActivityIndicator size={50} color={Colors.secondary} />
      ) : searchProducts.length > 0 ? (
          <SearchList searchProducts={searchProducts} />
    
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FilterList />
          <ProductsList products={products} />
          <LastProductsList products={products} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
