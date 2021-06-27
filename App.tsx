import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import {AuthProvider} from './src/context/AuthContext';
import {ProductProvider} from './src/context/ProductContext';

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <ProductProvider>{children}</ProductProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
