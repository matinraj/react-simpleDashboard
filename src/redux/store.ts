import { createStore, combineReducers, Reducer, AnyAction } from 'redux';
import authReducer from './auth/authReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import postsReducer from './posts/postReducer';
import { AuthState } from './auth/authReducer';
import { PostsState } from './posts/postReducer';

// Define the shape of the root state
export interface RootState {
  auth: AuthState;
  posts: PostsState;
}

// Define the persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

// Create store with persisted reducer
const store = createStore(persistedReducer);

// Create a persistor
const persistor = persistStore(store);

// Define RootState and AppDispatch types
// export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
