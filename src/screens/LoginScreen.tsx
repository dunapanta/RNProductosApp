import React from 'react';
import {View, Text, TextInput, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Background} from '../components/Background';
import {WhiteLogo} from '../components/WhiteLogo';
import {loginImage} from '../constants/Images';
import {loginStyles} from '../theme/loginTheme';

export const LoginScreen = () => {
  return (
    <>
      {/* Background */}
      <Background />

      <View style={loginStyles.loginContainer}>
        {/* Logo */}
        <WhiteLogo image={loginImage} />

        <Text style={loginStyles.title}>Login</Text>
        <Text style={loginStyles.label}>Correo:</Text>
        <TextInput
          placeholder="Ingrese su Correo"
          style={[
            loginStyles.inputField,
            Platform.OS === 'ios' && loginStyles.inputFieldiOS,
          ]}
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="email-address"
          underlineColorAndroid="white"
          selectionColor="rgba(255,255,255,0.5)"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={loginStyles.label}>Contraseña:</Text>
        <TextInput
          secureTextEntry
          placeholder="Ingrese su Contraseña"
          style={[
            loginStyles.inputField,
            Platform.OS === 'ios' && loginStyles.inputFieldiOS,
          ]}
          placeholderTextColor="rgba(255,255,255,0.4)"
          underlineColorAndroid="white"
          selectionColor="rgba(255,255,255,0.4)"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {/* Boton */}
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.8} style={loginStyles.button}>
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Crear Nueva Cuenta */}
        <View style={loginStyles.newUserContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log('press')}>
            <Text style={loginStyles.buttonText}>Crear Crenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
