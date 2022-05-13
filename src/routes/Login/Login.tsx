
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from "../Form";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useAppDispatch } from "../../app/hooks/hooks";
import { addUser } from "../../app/store/reducers/UserSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlerLogin = (email:any, password:any) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(addUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        }));
        navigate('/');
      })
      .catch(() => alert('Неправильно введен пароль или почта!'))
  }

  return (
    <Container maxWidth="xs" sx={{mt:"5rem"}}>
      <Grid container spacing={3} >
        <Grid item xs={12}>
          <Typography variant="h6">Введите данные для входа</Typography>
        </Grid>
        <Form 
          title="log in"
          handleClick={handlerLogin}
        />
      </Grid>
      <Button
        color="inherit"
        component={Link}
        to="/reg"
      >
          Don't have an account?
      </Button>
    </Container>
  )
}

export {Login}