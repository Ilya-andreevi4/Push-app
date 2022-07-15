import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useClipboard } from "use-clipboard-copy";
import { useSnapshot } from "valtio";
import { IConfig, LocalConfigs } from "../../../app/models/IConfig";
import {
  configStatus,
  localConfigs,
  state,
  userToken,
} from "../../../services/provider/proxyStates";
import ConfigDataServices from "../../../services/ConfigServices";
import { useUserAuth } from "../../../services/provider/AuthProvider";
import { Loader } from "../Loader";


const CreateFormConfig: FC = () => {
  const [message, setMessage] = useState({
    error: false,
    msg: "Введите данные",
    style: "info",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const snapConfig = useSnapshot(configStatus);
  const snapState = useSnapshot(state);

  const { user } = useUserAuth();

  const snap = useSnapshot(userToken);
  const token = snap.token;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const clipboard = useClipboard();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    clipboard.copy();
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;
  const handleClickOpenToken = () => {
    setOpen(true);
  };
  const handleCloseToken = () => {
    setOpen(false);
  };

  const systems = [
    { id: 1, systemName: "IOS Push" },
    { id: 2, systemName: "Android Push" },
    { id: 3, systemName: "Web Desktop" },
  ];

  const updateState = async () => {
    state.config_status = !state.config_status;
    await getConfigs();
    setIsLoading(false);
    configStatus.id = "";
    configStatus.title = "";
    configStatus.system = "";
    configStatus.deviceToken = "";
    configStatus.APIKey = "";
    configStatus.timeCreateConfig = "";
  };

  const handleClose = () => {
    state.open = false;
    configStatus.id = "";
    configStatus.title = "";
    configStatus.system = "";
    configStatus.deviceToken = "";
    configStatus.APIKey = "";
    configStatus.timeCreateConfig = "";
    setMessage({ error: false, msg: "Введите данные", style: "info" });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    setMessage({ error: false, msg: "Введите данные", style: "info" });
    if (
      configStatus.title === "" ||
      configStatus.system === "" ||
      configStatus.deviceToken === "" ||
      configStatus.APIKey === ""
    ) {
      setMessage({
        error: true,
        msg: "Заполните необходимые поля!",
        style: "error",
      });
      setIsLoading(false);
      return;
    }
    if (user) {
      try {
        if (configStatus.id) {
          const updateConfig: IConfig = {
            id: configStatus.id,
            title: configStatus.title,
            system: configStatus.system,
            deviceToken: configStatus.deviceToken,
            APIKey: configStatus.APIKey,
            timeCreateConfig: configStatus.timeCreateConfig,
          };
          await ConfigDataServices.updateConfig(configStatus.id, updateConfig);
          setMessage({
            error: false,
            msg: "Конфигурация изменена успешно!",
            style: "success",
          });
        } else {
          const newConfig = {
            title: configStatus.title,
            system: configStatus.system,
            deviceToken: configStatus.deviceToken,
            APIKey: configStatus.APIKey,
            timeCreateConfig: new Date(),
          };
          await ConfigDataServices.addConfig(newConfig, user.displayName);
          setMessage({
            error: false,
            msg: "Создана новая конфигурация!",
            style: "success",
          });
        }
      } catch (e: any) {
        setMessage({ error: true, msg: e.message, style: "error" });
      } finally {
        updateState();
      }
    } else {
      const isSessionConfigs = sessionStorage.getItem("configs");
      if (isSessionConfigs) {
        const sessionConfigs: LocalConfigs = JSON.parse(isSessionConfigs);
        sessionConfigs.configs &&
          localConfigs.configs.concat(sessionConfigs.configs);
      }
      try {
        if (configStatus.id) {
          const updateConfig: IConfig = {
            id: configStatus.id,
            title: configStatus.title,
            system: configStatus.system,
            deviceToken: configStatus.deviceToken,
            APIKey: configStatus.APIKey,
            timeCreateConfig: configStatus.timeCreateConfig,
          };
          const updateConfigs = localConfigs.configs.map((c: IConfig) => {
            if (c.id === updateConfig.id) {
              return updateConfig;
            }
            return c;
          });
          await sessionStorage.setItem(
            "configs",
            JSON.stringify({ configs: updateConfigs })
          );
          localConfigs.configs = updateConfigs;
          setMessage({
            error: false,
            msg: "Конфигурация изменена успешно!",
            style: "success",
          });
        } else {
          // Создание уникального ID START
          const uid = () => {
            var d = new Date().getTime();
            if (
              typeof performance !== "undefined" &&
              typeof performance.now === "function"
            ) {
              d += performance.now();
            }
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
              }
            );
          };
          // Создание уникального ID END
          const newConfig = {
            id: uid(),
            title: configStatus.title,
            system: configStatus.system,
            deviceToken: configStatus.deviceToken,
            APIKey: configStatus.APIKey,
            timeCreateConfig: new Date(),
          };

          localConfigs.configs.push(newConfig);
          sessionStorage.setItem("configs", JSON.stringify(localConfigs));
          setMessage({
            error: false,
            msg: "Создана новая конфигурация!",
            style: "success",
          });
        }
      } catch (e: any) {
        setMessage({ error: true, msg: e.message, style: "error" });
      } finally {
        updateState();
      }
    }
  };

  const getConfigs = async () => {
    try {
      setIsLoading(true);
      if (user) {
        const data = await ConfigDataServices.getAllConfigs(user.displayName);

        localConfigs.configs = data.docs.map(
          (doc: any) => ({ ...doc.data(), id: doc.id } as any)
        );
      } else {
        const isConfigList = sessionStorage.getItem("configs");
        if (isConfigList) {
          const sessionConfigs: LocalConfigs = JSON.parse(isConfigList);
          if (sessionConfigs.configs) {
            localConfigs.configs = sessionConfigs.configs.map(
              (doc: IConfig) => ({ ...doc, id: doc.id } as any)
            );
          }
        } else return;
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    configStatus.system = event.target.value as any;
  };

  return (
    <>
        <Dialog open={snapState.open} onClose={handleClose}>
          {configStatus.id ? (
            <DialogTitle>Изменение конфигурации</DialogTitle>
          ) : (
            <DialogTitle>Создание конфигурации</DialogTitle>
          )}
          {token && (
            <Box m={2}>
              <Button
                onClick={handleClickOpenToken}
                variant="outlined"
                color="info"
              >
                Токен твоего девайса
              </Button>
              <Dialog
                open={open}
                fullWidth
                maxWidth={"xs"}
                onClose={handleCloseToken}
              >
                <DialogTitle>
                  Токен твоего девайса для тестового пуш уведомления:
                </DialogTitle>
                <DialogContent>
                  <input
                    ref={clipboard.target}
                    value={token}
                    type="token"
                    readOnly
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    aria-describedby={id}
                    color="info"
                    onClick={handleClick}
                  >
                    Скопировать токен
                  </Button>
                  <Popover
                    open={openPop}
                    id={id}
                    anchorEl={anchorEl}
                    onClose={handleClosePop}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                  >
                    <Typography
                      sx={{ p: 1, fontSize: "small", background: "#C2F235" }}
                    >
                      Токен скопирован
                    </Typography>
                  </Popover>
                </DialogActions>
              </Dialog>
            </Box>
          )}
          {isLoading ? (
            <Loader />
          ) : message.error ? (
            <Alert
              severity={message.style as any}
              onClose={() => setMessage({ error: false, msg: "", style: "" })}
            >
              {message.msg}
            </Alert>
          ) : (
            <Alert severity={message.style as any}>{message.msg}</Alert>
          )}
          <DialogContent>
            <form
              id="myform"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreate();
              }}
            >
              <TextField
                value={snapConfig.title}
                onChange={(e) => (configStatus.title = e.target.value)}
                fullWidth={true}
                // defaultValue={snapConf.title}
                label="Название"
                color="info"
                variant="filled"
              />

              <TextField
                value={snapConfig.APIKey}
                onChange={(e) => (configStatus.APIKey = e.target.value)}
                fullWidth={true}
                // defaultValue={snapConf.APIKey}
                label="Api ключ"
                color="info"
                variant="filled"
              />
              <TextField
                value={snapConfig.deviceToken}
                onChange={(e) => (configStatus.deviceToken = e.target.value)}
                fullWidth={true}
                // defaultValue={snapConf.deviceToken}
                label="Токен девайса"
                color="info"
                variant="filled"
              />

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="select-label-system" color="info">
                  Система
                </InputLabel>
                <Select
                  labelId="select-label-system"
                  color="info"
                  id="select-system"
                  value={snapConfig.system}
                  label="Система"
                  onChange={handleChange}
                >
                  {systems.map((system) => (
                    <MenuItem key={system.id} value={system.systemName}>
                      {system.id}: {system.systemName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Grid container justifyContent="space-between" m={[0, 2, 1, 2]}>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => (state.open = false)}
                >
                  Назад
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  form="myform"
                  disabled={isLoading}
                >
                  {configStatus.id ? "Изменить" : "Создать"}
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
    </>
  );
};
export default CreateFormConfig;
