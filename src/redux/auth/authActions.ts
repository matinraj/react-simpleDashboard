// Define action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const JUST_AUTHENTICATED = 'JUST_AUTHENTICATED';

// Action creator for login
export const login = () => ({
  type: LOGIN,
});

// Action creator for logout
export const logout = () => ({
  type: LOGOUT,
});

// Action for when user just signed in
export const justAuthenticated = () => ({
  type: JUST_AUTHENTICATED,
});
