import { FC, useState } from "react";
import {
  TextField,
  Grid,
  Button,
} from "@mui/material";

interface FormProps {
  title: string;
  handleClick: (email:string, password:string) => void;
}

const Form: FC<FormProps> = ({title, handleClick}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (        
    <Grid container spacing={3}>
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
          sx={{}}
          onClick={() => handleClick(email, password)}
        >
            {title}
        </Button>
      </Grid>
    </Grid>
  )
}

export {Form}