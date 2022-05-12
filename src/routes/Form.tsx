import { useState } from "react";
import {
  TextField,
  Grid,
  Button,
} from "@mui/material";

const Form = ({title, handleClick}:any) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (        
    <Grid container spacing={3}>
      <Grid item xs={12}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth={true}
              label="First name"
              variant="filled"
            />
      </Grid>

      <Grid item xs={12}>
        
            <TextField
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              fullWidth={true}
              label="Last name"
              variant="filled"
            />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick(email, pass)}
        >
            {title}
        </Button>
      </Grid>
    </Grid>
  )

}

export {Form}