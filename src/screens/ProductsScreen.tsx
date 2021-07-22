import React, {useContext} from 'react';
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Text,
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
  const {searchProducts, loading, term, setTerm} = useSearch();

  return (
    <View style={{top: top + 5, ...styles.container}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <HeaderProducts />
      <SearchInput onDebounce={value => setTerm(value)} />
      {(() => {
        if (loading) {
          return (
            <ActivityIndicator
              style={{marginTop: 50}}
              size={50}
              color={Colors.secondary}
            />
          );
        }
        if (searchProducts.length > 0 && !loading) {
          return <SearchList searchProducts={searchProducts} />;
        }
        if (searchProducts.length === 0 && term.length > 0 && !loading) {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Image
                source={require('../assets/empty.png')}
                style={{width: 200, height: 200}}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.secondaryDark,
                }}>
                Producto no encontrado
              </Text>
            </View>
          );
        }
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <FilterList />
            <ProductsList products={products.slice(0, 8)} />
            <LastProductsList products={products} />
          </ScrollView>
        );
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
