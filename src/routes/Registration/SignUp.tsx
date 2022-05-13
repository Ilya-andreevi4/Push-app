import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from "../Form";
import { useAppDispatch } from "../../app/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../app/store/reducers/UserSlice";

const SignUp = () => {
  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();

  const handlerSignUp = (email:any, password:any) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        console.log(user);
        
        dispatch(addUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        }));
        navigate('/')
      })
      .catch(console.error)
  }

  return (
    <Form 
      title="sign up"
      handleClick={handlerSignUp}
    />
  )
}

export {SignUp}