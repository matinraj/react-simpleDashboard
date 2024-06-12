import { createStore, combineReducers } from 'redux';
import authReducer from './auth/authReducer';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
