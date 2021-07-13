import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import {AuthProvider} from './src/context/AuthContext';
import {ProductProvider} from './src/context/ProductContext';
import {ModalProvider} from './src/context/ModalContext';

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <ProductProvider>{children}</ProductProvider>
      </ModalProvider>
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
