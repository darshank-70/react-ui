import { configureStore } from '@reduxjs/toolkit';
import userPreferencesReducer from '../../features/redux-query-testing/store/userPreferencesSlice';

export const store = configureStore({
  reducer: {
    userPreferences: userPreferencesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
