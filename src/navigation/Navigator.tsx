import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {ProtectedScreen} from '../screens/ProtectedScreen';
import {AuthContext} from '../context/AuthContext';
import {LoadingScreen} from '../screens/LoadingScreen';
import {ProductsNavigator} from './ProductsNavigator';
import {OnBoardScreen} from '../screens/OnBoardScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  const {status} = useContext(AuthContext);

  if (status === 'checking') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {status === 'authenticated' ? (
        //<Stack.Screen name="ProductsNavigator" component={ProductsNavigator} />
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
      ) : (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
