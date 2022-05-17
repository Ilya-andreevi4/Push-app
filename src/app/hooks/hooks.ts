import { useContext } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, AuthContext } from '../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export function useAuth() {
//   const {email, token, id} = useAppSelector(state => state.userReducer);
//   return {
//     isAuth:!!email,
//     email,
//     token,
//     id,
//   };
// }
export function useAuth() {
  const value = useContext(AuthContext);
  return value
}