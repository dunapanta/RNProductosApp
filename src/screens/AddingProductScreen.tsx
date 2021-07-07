import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductStackParams} from '../navigation/ProductsNavigator';
import Colors from '../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props
  extends StackScreenProps<ProductStackParams, 'AddingProductScreen'> {}

export const AddingProductScreen = ({route, navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const product = route.params;
  return (
    <View style={{...styles.container, top: top}}>
      <Text style={styles.productText}>
        {product.name ? product.name : 'Nuevo Producto'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
