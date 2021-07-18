import {Usuario} from '../interfaces/appInterfaces';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

/* En el Backend el login, registro y validar token envian la misma 
respuesta por eso solo manejo signUp */
type AuthAction =
  | {type: 'signUp'; payload: {token: string; user: Usuario}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'updateUser'; payload: Usuario}
  | {
      type: 'notAuthenticathed';
    } /* si el token no es valido limpia todo a valores por defecto*/
  | {type: 'logout'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'not-authenticated',
        token: null,
        errorMessage: action.payload,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };

    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'updateUser':
      return {
        ...state,
        user: action.payload,
      };
    case 'logout':
    case 'notAuthenticathed':
      return {
        ...state,
        errorMessage: 'Token no válido',
        status: 'not-authenticated',
        token: null,
        user: null,
      };

    default:
      return state;
  }
};
