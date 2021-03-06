import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductsScreen} from '../screens/ProductsScreen';
import {ProductScreen} from '../screens/ProductScreen';
import {AddingProductScreen} from '../screens/AddingProductScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';

export type ProductStackParams = {
  ProductsScreen: undefined;
  ProductScreen: {
    id?: string;
    name?: string;
    precio?: Number;
    description?: string;
    img?: string;
  };
  AddingProductScreen: {
    id?: string;
    name?: string;
    precio?: Number;
    description?: string;
    img?: string;
  };
  ProtectedScreen:{

  }
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
      <Stack.Screen
        name="AddingProductScreen"
        component={AddingProductScreen}
      />
      <Stack.Screen
        name="ProtectedScreen"
        component={ProtectedScreen}
      />
      
    </Stack.Navigator>
  );
};
