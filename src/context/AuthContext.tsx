import React, {createContext, useReducer} from 'react';
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

  const signUp = async () => {};
  const signIn = async ({correo, password}: LoginData) => {
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
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const removeError = () => {};
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
