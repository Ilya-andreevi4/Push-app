import { FC, useState } from "react";
import { TextField, Grid, Button, Alert } from "@mui/material";
import { useUserAuth } from "../services/provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Main/Loader";

interface FormProps {
  title: string;
}
const Form: FC<FormProps> = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp, logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    setError("");
    if (title === "Регистрация") {
      try {
        await signUp(email, password);
        navigate("/");
      } catch (err: any) {
        setError(err.message);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else if (title === "Войти") {
      try {
        await logIn(email, password);
        navigate("/");
      } catch (err: any) {
        setError(err.message);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Что-то пошло не так...");
      console.error(error);
    }
  };
  return (
    <Grid container spacing={3} className="auth__form">
      <Grid item xs={12}>
        <TextField
          value={email}
          color="info"
          sx={{background:"#fff", borderRadius:"5px"}}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth={true}
          label="Электронная почта"
          variant="filled"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          color="info"
          sx={{background:"#fff", borderRadius:"5px"}}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth={true}
          label="Пароль"
          variant="filled"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          sx={{}}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {title}
        </Button>
      </Grid>
      <Grid item xs={12}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Alert severity="info">Введите данные</Alert>
        )}
      </Grid>
    </Grid>
  );
};

export { Form };
