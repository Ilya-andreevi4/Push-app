
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
  // const {ga} = useAuth();

  const handleLogin = async (email:any, password:any) => {
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
    }catch(e:any){
      const errorCode = e.code;
      const errorMessage = e.message;
      alert({errorCode, errorMessage})
    }finally{
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
            handleClick={handleLogin}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
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