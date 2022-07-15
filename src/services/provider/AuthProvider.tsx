import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IUser } from "../../app/models/IUser";
import { auth, db } from "../../firebase";
import { localConfigs, localPushs, userToken } from "./proxyStates";

const userAuthContext = createContext({} as any);

export function UserAuthContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>(null);

  const signUp = async(email: any, password: any) => {
    return (
      await createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          const usersCollectionRef = collection(db, "users/");
          const newUser = {
            uid: "",
            timestamp: Date.now(),
            email: email,
          };
          return addDoc(usersCollectionRef, newUser)
            .then((d) => {
              const userConfigsCollectionRef = collection(db, "users/", d.id, "/configs");
              const userPushsCollectionRef = collection(db, "users/", d.id, "/pushs");
              return (
                setDoc(doc(db, "users/", d.id), { uid: d.id }, { merge: true }),
                (userToken.id = d.id),
                localConfigs.configs.map(async(c)=>{await addDoc(userConfigsCollectionRef, c)}),
                localPushs.pushs.map(async(p)=>{await addDoc(userPushsCollectionRef, p)})
              );
            })
            .catch((e) => {
              console.error(e.message);
            });
        })
        .catch((e) => {
          console.error(e.message);
        }),
      auth.currentUser &&
        updateProfile(auth.currentUser, {
          displayName: userToken.id,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            console.log("Profile update!");
          })
          .catch((e) => {
            console.error(e.message);
          })
    );
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
