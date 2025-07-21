import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import favouritesReducer from '../redux/favouritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

/**
 * Configuration for redux-persist to enable persistent storage
 * of the Redux state using AsyncStorage.
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

/**
 * Root reducer combining all slice reducers.
 */
const rootReducer = combineReducers({
  favourites: favouritesReducer,
});

/**
 * Enhanced reducer with persistence capabilities.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Redux store configured with persisted reducer.
 */
export const store = configureStore({
  reducer: persistedReducer,
});

/**
 * Persistor instance used to persist and rehydrate the store.
 */
export const persistor = persistStore(store);

/**
 * Type representing the complete Redux state.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type representing the dispatch function from the store.
 */
export type AppDispatch = typeof store.dispatch;
