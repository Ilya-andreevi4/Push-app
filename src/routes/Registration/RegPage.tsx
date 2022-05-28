import React from "react";
import {
  Grid,
  Container,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Form } from "../Form";

function RegPage() {
  return (
    <Container maxWidth="xs" sx={{mt:"5rem"}}>
      <Grid container spacing={3} >
        <Grid item xs={12}>
          <Typography variant="h6">Создание нового аккаунта</Typography>
        </Grid>
        <Grid item xs={12}>          
          <Form 
            title="Регистрация"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
            color="inherit"
            component={Link}
            to="/log"
          >
              Войти в существующий аккаунт
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegPage;