import React from "react";
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
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

function RegPage() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlerSignUp = (email:string, password:string) => {
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
    <Container maxWidth="xs" sx={{mt:"5rem"}}>
      <Grid container spacing={3} >
        <Grid item xs={12}>
          <Typography variant="h6">Create new account</Typography>
        </Grid>
        <Grid item xs={12}>          
          <Form 
            title="sign up"
            handleClick={handlerSignUp}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
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