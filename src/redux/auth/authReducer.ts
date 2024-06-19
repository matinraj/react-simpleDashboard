// import { Action } from 'redux';
import { LOGIN, LOGOUT, JUST_AUTHENTICATED } from './authActions';
import { Reducer } from 'redux';

// Define the initial state of the auth reducer
interface AuthState {
  isAuthenticated: boolean;
  justAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  justAuthenticated: false,
};

// Define the action types
type AuthActionTypes =
  | { type: typeof LOGIN }
  | { type: typeof LOGOUT }
  | { type: typeof JUST_AUTHENTICATED };

// Auth reducer function to handle login and logout actions
const authReducer: Reducer<AuthState, AuthActionTypes> = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        justAuthenticated: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        justAuthenticated: false,
      };
    case JUST_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        justAuthenticated: true,
      };
    default:
      return state;
  }
};

export type { AuthState, AuthActionTypes };
export default authReducer;
