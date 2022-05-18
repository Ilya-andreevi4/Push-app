import { Auth, getAuth, onAuthStateChanged } from "firebase/auth"
import Cookies from "js-cookie"
import { createContext, FC, useCallback, useEffect, useMemo, useState } from "react"
import { TypeSetState } from "../../services/TypeSetState"
import { IUser } from "../models/IUser"

interface IContext {
  user: IUser | null,
  setUser: TypeSetState<IUser | null>,
  ga: Auth,
  id: IUser[] | null,
  setId: TypeSetState<IUser[] | null>,
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = (props : any) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [id, setIdData] = useState<IUser[] | null>(null)
  const ga = getAuth()

  const setId = useCallback((idData:any) => {
    setIdData(idData);
    if (idData) {
      Cookies.set("auth-token", idData);
    } else {
      Cookies.remove("auth-token");
    }
  }, []);
  
  useEffect(() => {
    const unListen = onAuthStateChanged(ga, authUser => {
      const idData = Cookies.get("auth-token") as any;
      setIdData(idData);
      try {
        if(idData) {
          setUser(authUser ? {
            id: authUser.uid,
            password: user?.password,
            email: authUser?.email,
            token: user?.token
          } : null)
        } 
      }catch {
        setId(null);
      }
    })
    return () => {unListen()}
  }, [user, ga, id, setId])

  const values = useMemo(() => ({
    user,
    setUser,
    ga,
    id,
    setId
  }), [user, ga, id, setId])

  return (
  <AuthContext.Provider value={values}>
    {props.children}
  </AuthContext.Provider>
  )
}