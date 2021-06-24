import React, {createContext, useEffect, useReducer} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginData, LoginResponse, Usuario} from '../interfaces/appInterfaces';
import {authReducer, AuthState} from './authReducer';
import productosApi from '../api/productosApi';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: () => void;
  signIn: (loginData: LoginData) => void;
  removeError: () => void;
  logout: () => void;
};

const AutInitialState: AuthState = {
  status: 'checking',
  token: null,
  errorMessage: '',
  user: null,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, AutInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    //Sin token
    if (!token) return dispatch({type: 'notAuthenticathed'});

    //Hay token
    const resp = await productosApi.get('/auth');

    if (resp.status !== 200) {
      return dispatch({type: 'notAuthenticathed'});
    }

    //El Backend genera un nuevo token cuando sellama a /auth por eso lo guardo
    await AsyncStorage.setItem('token', resp.data.token);

    dispatch({
      type: 'signUp',
      payload: {
        token: resp.data.token,
        user: resp.data.usuario,
      },
    });
    /* AsyncStorage.getItem('token')
      .then(token => {
        console.log({token});
      })
      .catch(err => {
        console.log({err});
      }); */
  };

  const signUp = async () => {};
  const signIn = async ({correo, password, loading}: LoginData) => {
    loading(true);
    try {
      const resp = await productosApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario,
        },
      });

      //Guardar token
      await AsyncStorage.setItem('token', resp.data.token);
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: 'addError',
        payload: err.response.data.msg || 'Datos Incorrectos',
      });
    }
    loading(false);
  };
  const removeError = () => {
    dispatch({
      type: 'removeError',
    });
  };

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        removeError,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
