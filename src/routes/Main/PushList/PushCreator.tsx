import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import { pushStatus, state } from "../../../services/provider/updateState";
import { Loader } from "../Loader";

export function PushCreator() {
  const snap: any = useSnapshot(state);
  const snapPush: any = useSnapshot(pushStatus);
  const snapState: any = useSnapshot(state);
  const [isLoading, setIsLoading] = useState(false);
  const [configs, setConfigs] = useState<IConfig[]>([]);
  const [msg, setMsg] = useState({
    error: false,
    text: "Введите данные",
    style: "info",
  });

  const updateState = () => {
    state.status_push = !state.status_push;
    setIsLoading(false);
    pushStatus.configPush = {
      id: "",
      title: "",
      deviceToken: "",
      APIKey: "",
      system: "",
    };
    pushStatus.titleStatus = "";
    pushStatus.messageStatus = "";
    pushStatus.imageStatus = "";
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

  const handleSubmit = async () => {
    setIsLoading(true);
    if (
      pushStatus.configPush === null ||
      pushStatus.messageStatus === "" ||
      pushStatus.titleStatus === ""
    ) {
      setIsLoading(false);
      setMsg({
        error: true,
        text: "Заполните необходимые поля!",
        style: "error",
      });
      return;
    } else {
      try {
        // await sendPushNotification;

        const pushDate = [
          new Date().toLocaleTimeString(),
          new Date().toDateString(),
        ]
          .toString()
          .split(",")
          .join(" ");
        const timePush = new Date();
        const newPush = {
          configsSetting: JSON.parse(pushStatus.configPush),
          title: pushStatus.titleStatus,
          message: pushStatus.messageStatus,
          image: pushStatus.imageStatus,
          pushDate,
          timePush,
        };
        await PushDataServices.addPush(newPush);
      } catch (e) {
        console.log(e);
      } finally {
        updateState();
      }
    }
  };

  const handlerEnter = useCallback((event: any) => {
    if (event.key === "Enter") {
      if (state.open) {
        return;
      } else {
        handleSubmit();
      }
    }
  }, []);

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
        <Typography variant="h5" align="center" sx={{ mt: "1rem", mb: 0 }}>
          Создание Пуш-уведомлений
        </Typography>
        <Grid container spacing={0.5} mt={0} pb={1}>
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
                <FormControl
                  fullWidth
                  color="info"
                  className="config_select"
                  size="small"
                >
                  <InputLabel id="select-label">Конфиг</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={snapPush.configPush}
                    label="Config"
                    onChange={(e) => (pushStatus.configPush = e.target.value)}
                  >
                    {configs.map((config, index) => (
                      <MenuItem
                        key={config.id}
                        value={JSON.stringify(config)}
                        defaultValue=""
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
              value={snapPush.titleStatus}
              onChange={(e) => (pushStatus.titleStatus = e.target.value)}
              fullWidth={true}
              label="Заголовок"
              className="message_input"
              color="info"
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={snapPush.messageStatus}
              onChange={(e) => (pushStatus.messageStatus = e.target.value)}
              fullWidth={true}
              label="Сообщение"
              className="message_input"
              color="info"
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={snapPush.imageStatus}
              onChange={(e) => (pushStatus.imageStatus = e.target.value)}
              fullWidth={true}
              label="Ссылка на картинку (необязательно)"
              className="message_input"
              color="info"
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              disableElevation
              variant="contained"
              disabled={isLoading}
              color="secondary"
              sx={{ float: "right", mt: 1 }}
              onClick={() => handleSubmit()}
            >
              Отправить
            </Button>
          </Grid>
        </Grid>
      </div>
      <Card className="prototypeMsg">
        <CardContent sx={{ display: "inline-block", maxWidth: "50%" }}>
          <Typography gutterBottom variant="h6" >
            {pushStatus.titleStatus
              ? pushStatus.titleStatus
              : "Пример заголовка"}
          </Typography>
          <Typography variant="body2">
            {pushStatus.messageStatus
              ? pushStatus.messageStatus
              : "Пример сообщения"}
          </Typography>
        </CardContent>
        {pushStatus.imageStatus ? (
          <CardMedia
            component="img"
            className="post_img prev"
            image={pushStatus.imageStatus}
            alt="Изображение поста не найдено"
          />
        ):(<CardMedia
          component="img"
          className="post_img prev"
          image="/image.jpg"
          alt="Изображение поста"
        />)}
      </Card>
    </div>
  );
}
export default PushCreator;
