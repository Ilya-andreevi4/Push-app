import {
  Button,
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
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
  const [message, setMessage] = React.useState("");
  const [ConfigId, setConfigId] = React.useState("");
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
    if (idConfigs === "" || message === "") {
      setIsLoading(false);
      setMsg({
        error: true,
        text: "Нужно заполнить оба поля!",
        style: "error",
      });
      return;
    } else {
      try {
        const pushDate = new Date().toDateString();
        const newPush = { idConfigs, message, pushDate };
        await PushDataServices.addPush(newPush);
      } catch (e) {
        console.log(e);
      } finally {
        updateState();
        setIsLoading(false);
        setConfigId("");
        setMessage("");
      }
    }
  };

  const handler = useCallback(
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
      document.addEventListener("keyup", handler);
      return () => {
        document.removeEventListener("keyup", handler);
      };
    }
  }, [isLoading, handler]);

  return (
    <Container maxWidth="xs">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box>
            <Grid
              container
              mt={1}
              mb={2}
              justifyContent="space-between"
              alignItems="center"
            >
              {isLoading ? (
                <Loader/>
              ) : // <Alert severity={msg.style as any}>Идёт загрузка конфигов...</Alert>
              msg.error ? (
                <Alert severity={msg.style as any}>{msg.text}</Alert>
              ) : (
                <Alert severity={msg.style as any}>{msg.text}</Alert>
              )}
            </Grid>

            {configs && (
              <FormControl fullWidth>
                <InputLabel id="select-label">Конфигурация</InputLabel>
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth={true}
            label="Message"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
            onClick={() => handleSubmit(ConfigId, message)}
          >
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
export default PushCreator;
