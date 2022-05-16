
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from "../Form";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useAppDispatch } from "../../app/hooks/hooks";
import { addUser } from "../../app/store/reducers/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlerLogin = async (email:any, password:any) => {
    const auth = getAuth();
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
          dispatch(addUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }));
          navigate('/');
        })
    } catch (e){
      console.log(e)
      alert('Неправильно введен пароль или почта!')
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="xs" sx={{mt:"5rem"}}>
      <Grid container spacing={3} >
        <Grid item xs={12}>
          <Typography variant="h6">Account login</Typography>
        </Grid>
        <Grid item xs={12}>
          <Form 
            title="log in"
            handleClick={handlerLogin}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="inherit"
            component={Link}
            to="/reg"
          >
              Don't have an account?
          </Button>
        </Grid>        
      </Grid>      
    </Container>
  )
}

export {Login}