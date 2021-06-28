import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductsScreen} from '../screens/ProductsScreen';
import {ProductScreen} from '../screens/ProductScreen';

export type ProductStackParams = {
  ProductsScreen: undefined;
  ProductScreen: {
    id?: string;
    name?: string;
    precio?: Number;
    description?: string;
    img?: string;
  };
};

const Stack = createStackNavigator<ProductStackParams>();

export const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
      }}>
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
