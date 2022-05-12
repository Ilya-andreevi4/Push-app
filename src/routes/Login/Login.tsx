import { useDispatch } from "react-redux"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from "../Form";

const Login = () => {
  const dispatch = useDispatch();

  const handlerLogin = (email:any, password:any) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(console.log)
      .catch(console.error)
  }

  return (
    <Form 
      title="log in"
      handleClick={handlerLogin}
    />
  )
}

export {Login}