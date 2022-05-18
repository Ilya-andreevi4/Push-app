// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import Cookies from "js-cookie";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import { AuthContext } from "../../app/auth/AuthProvider";
// import { IUser } from "../../app/models/IUser";
export {}
// export function AuthProvider(props:any) {
//   const [user, setUser] = useState<IUser| null>(null);
//   const ga = getAuth()
//   const [token, setTokenData] = useState(null);

//   const setToken = useCallback((tokenData : any) => {
//     setTokenData(tokenData);
//     if (tokenData) {
//       Cookies.set("auth-token", tokenData);
//     } else {
//       Cookies.remove("auth-token");
//     }
//   }, []);

//   const logOut = useCallback(() => {
//     setUser(null);
//     setToken(null);
//   }, [setToken]);

//   // const loadData = useCallback(async () => {
//   //   const tokenData = Cookies.get("auth-token");
//   //   setTokenData(tokenData);

//   //   try {
//   //     if (tokenData) {
//   //       const { data } = await api.auth.getProfile();
//   //       setUser(data);
//   //     }
//   //   } catch {
//   //     setToken(null);
//   //   } finally {
//   //     setIsLoaded(true);
//   //   }
//   // }, [setToken]);

//   const unListen = onAuthStateChanged(ga, authUser => {
//     const tokenData = Cookies.get("auth-token");
//     setTokenData(tokenData);

//         setUser(authUser ? {
//           id: authUser.uid,
//           password: user?.password,
//           email: authUser?.email,
//           token: user?.token
//         } : null)
//       })

//   useEffect(() => {
//     unListen();
//   }, [unListen]);

//   const contextValue = useMemo(
//     () => ({
//       ga,
//       user,
//       token,
//       setUser,
//       setToken,
//       logOut,
//     }),
//     [ga, user, token, setToken, logOut]
//   );

//   // useEffect(() => {
//   //   const unListen = onAuthStateChanged(ga, authUser => {
//   //     setUser(authUser ? {
//   //       id: authUser.uid,
//   //       password: user?.password,
//   //       email: authUser?.email,
//   //       token: user?.token
//   //     } : null)
//   //   })
//   //   return () => {unListen()}
//   // }, [])

//   // const values = useMemo(() => ({
//   //   user,
//   //   setUser,
//   //   ga,
//   // }), [user, ga,])

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// }