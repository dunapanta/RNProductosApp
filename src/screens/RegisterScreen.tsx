import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {WhiteLogo} from '../components/WhiteLogo';
import Colors from '../constants/Colors';
import {registerImage} from '../constants/Images';
import {useForm} from '../hooks/useForm';
import {loginStyles} from '../theme/loginTheme';
import {AuthContext} from '../context/AuthContext';
import {RegisterButton} from '../components/RegisterButton';
import {ModalContext} from '../context/ModalContext';
import {ErrorModalContent} from '../components/ErrorModalContent';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {signUp, errorMessage, removeError} = useContext(AuthContext);
  const {email, password, name, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });
  const {openModal} = useContext(ModalContext);

  const [loading, setLoading] = useState(false);

  /* useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }
    if (errorMessage === 'Token no válido') {
      return;
    }

    Alert.alert('Registro Incorrecto', errorMessage, [
      {
        text: 'Aceptar',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]); */

  const onRegister = () => {
    Keyboard.dismiss();
    signUp({nombre: name, correo: email, password, loading: setLoading});
  };

  const errorTrigger = () => {
    if (errorMessage.length !== 0 && errorMessage !== 'Token no válido') {
      return;
    }
    openModal();
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />

      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: Colors.primary}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.loginContainer}>
          {/* Logo */}
          <WhiteLogo image={registerImage} />

          <Text style={loginStyles.title}>Registro</Text>

          <Text style={loginStyles.label}>Nombre:</Text>
          <TextInput
            placeholder="Ingrese su Nombre"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldiOS,
            ]}
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="default"
            underlineColorAndroid="white"
            selectionColor="rgba(255,255,255,0.5)"
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
          />

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
            onSubmitEditing={onRegister}
          />

          <Text style={loginStyles.label}>Contraseña:</Text>
          <TextInput
            secureTextEntry
            placeholder="*************"
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
            onSubmitEditing={onRegister}
          />

          {/* Modal */}
          {errorMessage.length !== 0 && errorMessage !== 'Token no válido' && (
            <ErrorModalContent
              titleHead="Registro Incorrecto"
              errorMessage={errorMessage}
              removeError={removeError}
              statusBarColor="#7A211B"
            />
          )}

          {/* Boton */}
          <RegisterButton
            onRegister={onRegister}
            loadingButton={loading}
            errorTrigger={errorTrigger}
          />

          {/* Crear Nueva Cuenta */}
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('LoginScreen')}>
              <Text style={loginStyles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
