import { FC, useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
} from "@mui/material";

interface FormProps {
  title: string;
  handleClick: (email:string, password:string) => void;
  isLoading: boolean;
}

const Form: FC<FormProps> = ({title, handleClick, isLoading}) => {
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
              required
            />
      </Grid>

      <Grid item xs={12}>
        
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth={true}
              label="Password"
              variant="filled"
              required
            />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          sx={{}}
          onClick={() => handleClick(email, password)}
          disabled={isLoading}
        >
            {title}
        </Button>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <Typography variant="caption">Подождите секунду</Typography>
        ):(
          <Typography variant="caption">Введите данные</Typography>
        )}
      </Grid>
    </Grid>
  )
}

export {Form}