// Define action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action creator for login
export const login = () => ({
  type: LOGIN,
});

// Action creator for logout
export const logout = () => ({
  type: LOGOUT,
});
