import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "../../app/models/IUser";
import { auth, db } from "../../firebase";

const userAuthContext = createContext({} as any);

export function UserAuthContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>(null);

  function signUp(email: any, password: any) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const usersCollectionRef = collection(db, "app/users/" + user.user.uid);
        const newUser = {
            uid: user.user.uid,
            timestamp: Date.now(),
            email: email,
          }
        return addDoc(usersCollectionRef, newUser);
      })

      .catch((error) => {
        var errorMessage = error.message;
        console.error(errorMessage);
      });
  }
  function logIn(email: any, password: any) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const values = useMemo(
    () => ({
      signUp,
      logIn,
      logOut,
      user,
    }),
    [user]
  );

  return (
    <userAuthContext.Provider value={values}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
