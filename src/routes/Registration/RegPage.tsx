import React, { useState } from "react";
import {
  Grid,
  Container,
  Button,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../Form";
import { addUser } from "../../app/store/reducers/UserSlice";
import { useAppDispatch } from "../../app/hooks/hooks";
import { createUserWithEmailAndPassword, getAuth} from "firebase/auth";

function RegPage() {
  
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 
  // const {ga} = useAuth();

  const handlerSignUp = async (email:string, password:string) => {
    const auth = getAuth();
    
    try {
      setIsLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {        
          dispatch(addUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }));
          navigate('/')
        })
    } catch (e:any){
      const errorCode = e.code;
      const errorMessage = e.message;
      alert({errorCode, errorMessage})
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="xs" sx={{mt:5}}>
      <Grid container spacing={3} >
        <Grid item xs={12}>
          <Typography variant="h6">Create new account</Typography>
        </Grid>
        <Grid item xs={12}>          
          <Form 
            title="sign up"
            handleClick={handlerSignUp}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
            color="inherit"
            component={Link}
            to="/log"
          >
              Already have an account?
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegPage;