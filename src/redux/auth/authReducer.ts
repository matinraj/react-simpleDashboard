import { LOGIN, LOGOUT } from './authActions';

// Define the initial state of the auth reducer
interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

// const initialFunc = () => {
//   console.log('Initialization');
//   return initialState;
// };

// Define the action types
type AuthActionTypes = { type: typeof LOGIN } | { type: typeof LOGOUT };

// Auth reducer function to handle login and logout actions
const authReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
