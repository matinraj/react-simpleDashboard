import { LOGIN, LOGOUT } from './authActions';

// Define the initial state of the auth reducer
interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

// Auth reducer function to handle login and logout actions
const authReducer = (state = initialState, action: any) => {
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
