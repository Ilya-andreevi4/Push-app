import React from "react";
import {
  Grid,
  Container,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
// import { addUser } from "../../app/store/reducers/ActionCreators";
// import { userAPI } from "../../services/UserService";
// import { IUser } from "../../app/models/IUser";
import { SignUp } from "./SignUp";

function RegPage() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [firstName, setFirstName] = React.useState("");
  // const [lastName, setLastName] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [createUser] = userAPI.useCreateUserMutation()

  // const handleCreate = async (data:any) => {
  //   try {
  //     setIsLoading(true);
  //     console.log(data);
  //     await createUser(data as IUser);
  //   } catch (e){
  //     console.log(e);
  //   } finally{
  //     setIsLoading(false);
  // }
  // };

  return (
    <Container maxWidth="xs" sx={{mt:"5rem"}}>
      <Grid container spacing={3} >
        <Grid item xs={12}>
          <Typography variant="h6">Create new account</Typography>
        </Grid>
      </Grid>

      <SignUp/>
      
      <Button
        color="inherit"
        component={Link}
        to="/log"
      >
          Already have an account?
      </Button>
      {/* <form onSubmit={(e) => {
              e.preventDefault();
              handleCreate({firstName, lastName, email, password});
            }}>
          
        <Grid container spacing={3}>
          <Grid item xs={12}>
                <TextField
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth={true}
                  label="First name"
                  variant="filled"
                />
          </Grid>

          <Grid item xs={12}>
            
                <TextField
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth={true}
                  label="Last name"
                  variant="filled"
                />
          </Grid>

          <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth={true}
                  label="Email"
                  variant="filled"
                />
          </Grid>

          <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth={true}
                  label="Password"
                  variant="filled"
                />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
                Registration
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
                Already have an account?
            </Button>
          </Grid>
        </Grid>
      </form> */}
    </Container>
  );
}

export default RegPage;