import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "../../app/models/IUser";
import { auth } from "../../firebase";

const userAuthContext = createContext({} as any);

export function UserAuthContextProvider({children}:any) {

  const [user, setUser] = useState<IUser | null>(null)

  function signUp(email:any, password:any) {
    return createUserWithEmailAndPassword( auth, email, password);   
  }
  function logIn(email:any, password:any) {
    return signInWithEmailAndPassword( auth, email, password);   
  }
  function logOut() {
    return signOut(auth);   
  }

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  const values = useMemo(() => ({
    signUp,
    logIn,
    logOut,
    user
  }), [user])

  return <userAuthContext.Provider value={values}>{children}</userAuthContext.Provider>
}

export function useUserAuth() {
  return useContext(userAuthContext);
}