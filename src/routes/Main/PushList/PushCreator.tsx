import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/system";
import ConfigDataServices from "../../../services/ConfigServices";
import PushDataServices from "../../../services/PushService";
import { IConfig } from "../../../app/models/IConfig";
import { useSnapshot } from "valtio";
import { state } from "./updateState";
import { Loader } from "../Loader";

export function PushCreator() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [ConfigId, setConfigId] = React.useState("");
  const [image, setImage] = useState("");
  const [configs, setConfigs] = useState<IConfig[]>([]);
  const [msg, setMsg] = useState({
    error: false,
    text: "Введите данные",
    style: "info",
  });
  const snap: any = useSnapshot(state);

  const updateState = () => {
    state.status_push = !state.status_push;
  };

  const handleChange = (event: SelectChangeEvent) => {
    setConfigId(event.target.value as any);
  };

  const getConfigs = async () => {
    setMsg({ error: false, text: "Введите данные", style: "info" });
    try {
      setIsLoading(true);
      setMsg({
        error: false,
        text: "Идёт загрузка конфигов...",
        style: "warning",
      });
      const data = await ConfigDataServices.getAllConfigs();
      setConfigs(
        data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id } as any))
      );
    } catch (e: any) {
      setMsg({ error: true, text: e.message, style: "error" });
    } finally {
      setIsLoading(false);
      setMsg({ error: false, text: "Введите данные", style: "info" });
    }
  };

  const handleSubmit = async (idConfigs: any, message: any) => {
    setIsLoading(true);
    if (idConfigs === "" || message === "" || title === "") {
      setIsLoading(false);
      setMsg({
        error: true,
        text: "Заполните необходимые поля!",
        style: "error",
      });
      return;
    } else {
      try {
        const pushDate = [
          new Date().toLocaleTimeString(),
          new Date().toDateString(),
        ]
          .toString()
          .split(",")
          .join(" ");
        const timePush = new Date();
        const newPush = { idConfigs, title, message, image, pushDate, timePush };
        await PushDataServices.addPush(newPush);
      } catch (e) {
        console.log(e);
      } finally {
        updateState();
        setIsLoading(false);
        setConfigId("");
        setTitle("");
        setMessage("");
      }
    }
  };

  const handlerEnter = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        return handleSubmit(ConfigId, message);
      }
    },
    [ConfigId, message]
  );

  useEffect(() => {
    getConfigs();
  }, [snap.config_status]);

  useEffect(() => {
    if (!isLoading) {
      document.addEventListener("keyup", handlerEnter);
      return () => {
        document.removeEventListener("keyup", handlerEnter);
      };
    }
  }, [isLoading, handlerEnter]);

  return (
    <div>
      <div className="PushCreator">
        <Typography variant="h5" align="center" sx={{ mt: "1rem", mb: "1rem" }}>
          Создание Пуш-уведомлений
        </Typography>
        <Grid container spacing={3} mt={1} pb={1}>
          <Grid item xs={12}>
            <Box>
              <Grid container mb={2} justifyContent="space-between">
                <Grid item xs={12}>
                  {isLoading ? (
                    <Loader /> // <Alert severity={msg.style as any}>Идёт загрузка конфигов...</Alert>
                  ) : msg.error ? (
                    <Alert severity={msg.style as any}>{msg.text}</Alert>
                  ) : (
                    <Alert severity={msg.style as any}>{msg.text}</Alert>
                  )}
                </Grid>
              </Grid>
              {configs && (
                <FormControl fullWidth color="info" className="config_select">
                  <InputLabel id="select-label">Конфиг</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={ConfigId}
                    label="Config"
                    onChange={handleChange}
                  >
                    {configs.map((config, index) => (
                      <MenuItem
                        key={config.id}
                        value={[config.title, " - ", config.system]
                          .toString()
                          .split(",")
                          .join("")}
                      >
                        {index + 1}. {config.title} - {config.system}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth={true}
              label="Заголовок"
              className="message_input"
              color="info"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth={true}
              label="Сообщение"
              className="message_input"
              color="info"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={image}
              onChange={(e) => setImage(e.target.value)}
              fullWidth={true}
              label="Ссылка на картинку (необязательно)"
              className="message_input"
              color="info"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              disableElevation
              variant="contained"
              disabled={isLoading}
              color="secondary"
              sx={{ float: "right" }}
              onClick={() => handleSubmit(ConfigId, message)}
            >
              Отправить
            </Button>
          </Grid>
        </Grid>
      </div>
      <Card className="prototypeMsg">
        <CardContent sx={{ display:"inline-block", maxWidth:"60%"}}>
          <Typography gutterBottom variant="h5" component="div">
            {title ? title : "Пример заголовка"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {message ? message : "Пример сообщения"}
           </Typography>
        </CardContent>
        <CardMedia
          component="img"
          className="post_img prev"
          image={image}
          alt="Изображение поста"
        />
      </Card>
    </div>
  );
}
export default PushCreator;
