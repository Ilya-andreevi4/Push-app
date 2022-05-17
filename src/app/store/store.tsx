import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { configAPI } from '../../services/ConfigService';
import { pushAPI } from '../../services/PushService';
import userReducer from './reducers/UserSlice'
import React, { createContext, FC, useEffect, useMemo, useState } from 'react'
import { IUser } from '../models/IUser'
import { TypeSetState } from '../../services/TypeSetState'
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';

const rootReducer = combineReducers({
  [configAPI.reducerPath]: configAPI.reducer,
  [pushAPI.reducerPath]: pushAPI.reducer,
  userReducer
})

interface IContext {
  user: IUser | null
  setUser: TypeSetState<IUser | null>
  ga: Auth
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider: FC = ({children}: any) => {
  const [user, setUser] = useState<IUser | null>(null)
  const ga = getAuth()
  
  useEffect(() => {
    const unListen = onAuthStateChanged(ga, authUser => {
      setUser(authUser || null)
    })
    return () => {unListen()}
  }, [])

  const values = useMemo(() => ({
    user,
    setUser,
    ga,
  }), [user, ga])

  return (
  <AuthContext.Provider value={values}>
    {children}
  </AuthContext.Provider>
  )
}

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
