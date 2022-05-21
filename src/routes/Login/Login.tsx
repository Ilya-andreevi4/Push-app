import { Form } from "../Form";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Link} from "react-router-dom";

const Login = () => {

  return (
    <Container maxWidth="xs" sx={{mt:"5rem"}}>
      <Grid container spacing={3} >
        <Grid item xs={12}>
          <Typography variant="h6">Account login</Typography>
        </Grid>
        <Grid item xs={12}>
          <Form 
            title="log in"
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