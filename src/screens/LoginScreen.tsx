import React, {useContext, useEffect} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import {Background} from '../components/Background';
import {WhiteLogo} from '../components/WhiteLogo';
import Colors from '../constants/Colors';
import {loginImage} from '../constants/Images';
import {loginStyles} from '../theme/loginTheme';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';
import {Alert} from 'react-native';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {signIn, errorMessage, removeError} = useContext(AuthContext);

  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }

    Alert.alert('Login Incorrecto', errorMessage, [
      {
        text: 'Aceptar',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onLogin = () => {
    Keyboard.dismiss();

    signIn({correo: email, password});
  };
  return (
    <>
      {/* Background */}
      <Background />
      <StatusBar backgroundColor={Colors.primary} />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
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
            onChangeText={value => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
          />
          {/* Boton */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Crear Nueva Cuenta */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={loginStyles.buttonText}>Crear Cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
