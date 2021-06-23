import React from 'react';
import {View, Text, TextInput} from 'react-native';

import {Background} from '../components/Background';
import {WhiteLogo} from '../components/WhiteLogo';
import {loginImage} from '../constants/Images';
import {loginStyles} from '../theme/loginTheme';

export const LoginScreen = () => {
  return (
    <>
      {/* Background */}
      <Background />

      {/* Logo */}
      <WhiteLogo image={loginImage} />

      <Text style={loginStyles.title}>Login</Text>
      <Text style={loginStyles.label}>Correo</Text>
      <TextInput
        placeholder="Ingrese su Correo"
        placeholderTextColor="rgba(255,255,255,0.4)"
        keyboardType="email-address"
      />
    </>
  );
};
