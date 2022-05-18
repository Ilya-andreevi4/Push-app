import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { configAPI } from '../../services/ConfigService';
import { pushAPI } from '../../services/PushService';
import userReducer from './reducers/UserSlice'

const rootReducer = combineReducers({
  [configAPI.reducerPath]: configAPI.reducer,
  [pushAPI.reducerPath]: pushAPI.reducer,
  userReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(configAPI.middleware, pushAPI.middleware)
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = AppStore['dispatch'];
