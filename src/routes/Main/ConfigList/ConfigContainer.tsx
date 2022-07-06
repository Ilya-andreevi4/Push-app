import {
  Alert,
  Box,
  Button,
  ButtonGroup,
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
  Skeleton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IConfig } from "../../../app/models/IConfig";
import ConfigDataServices from "../../../services/ConfigServices";
import { Loader } from "../Loader";
import {
  configStatus,
  state,
  userToken,
} from "../../../services/provider/proxyStates";
import ConfigItem from "./ConfigItem";
import { useSnapshot } from "valtio";
import { useClipboard } from "use-clipboard-copy";
import { useUserAuth } from "../../../services/provider/AuthProvider";

const ConfigContainer = () => {
  const [message, setMessage] = useState({
    error: false,
    msg: "Введите данные",
    style: "info",
  });
  const [configs, setConfigs] = useState<IConfig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useUserAuth();

  const snap: any = useSnapshot(userToken);
  const clipboard = useClipboard();
  const token = snap.token;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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

  const updateState = () => {
    state.config_status = !state.config_status;
    getConfigs();
    setIsLoading(false);
    configStatus.id = "";
    configStatus.title = "";
    configStatus.system = "";
    configStatus.deviceToken = "";
    configStatus.APIKey = "";
    configStatus.timeCreateConfig = "";
  };
  const snapConf = useSnapshot(configStatus);
  const snapState = useSnapshot(state);
  const matches = useMediaQuery("(max-width:377px)");
  const desctopIfc = useMediaQuery("(min-width:1150px)");

  const handleClickOpen = () => {
    state.open = true;
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
        const time = new Date();
        const newConfig = {
          title: configStatus.title,
          system: configStatus.system,
          deviceToken: configStatus.deviceToken,
          APIKey: configStatus.APIKey,
          timeCreateConfig: time,
        };
        await ConfigDataServices.addConfig(newConfig, user.uid);
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
  };

  const getConfigs = async () => {
    setError("");
    try {
      setIsLoading(true);
      if (user) {
        const data = await ConfigDataServices.getAllConfigs(user.uid);
        setConfigs(
          data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id } as any))
        );
      } else {
        setError(
          "Зарегистрируйтесь или войдите в существующий аккаунт, чтобы увидеть историю сообщений."
        );
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id: any) => {
    setMessage({ error: false, msg: "Введите данные", style: "info" });
    try {
      await ConfigDataServices.deleteConfig(id, user.uid);
    } catch (e: any) {
      setMessage({ error: true, msg: e.message, style: "error" });
    } finally {
      updateState();
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    configStatus.system = event.target.value as any;
  };

  const handleUpdate = async (updatedConfig: IConfig) => {
    state.open = true;
    configStatus.id = updatedConfig.id;
    configStatus.title = updatedConfig.title;
    configStatus.system = updatedConfig.system;
    configStatus.APIKey = updatedConfig.APIKey;
    configStatus.deviceToken = updatedConfig.deviceToken;
    configStatus.timeCreateConfig = updatedConfig.timeCreateConfig;
  };

  useEffect(() => {
    getConfigs();
  }, [user]);

  return (
    <div className="ConfigContainer">
      {configs && (
        <Box>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Grid item xs={12}>
              <Typography
                variant="h5"
                noWrap
                gutterBottom
                align="center"
                sx={{ mt: 3, mb: 2 }}
              >
                Конфигурации
              </Typography>
            </Grid>
            {matches ? (
              <Grid item xs={12} justifyContent="center">
                <ButtonGroup size="small">
                  <Button
                    disableElevation
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpen}
                  >
                    Создать
                  </Button>
                  <Button
                    disableElevation
                    variant="outlined"
                    color="primary"
                    onClick={getConfigs}
                    sx={{ float: "right" }}
                  >
                    Обновить
                  </Button>
                </ButtonGroup>
              </Grid>
            ) : desctopIfc ? (
              <Grid
                container
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Grid item xs={6} sx={{ float: "left" }}>
                  <Button
                    disableElevation
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpen}
                  >
                    Создать
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{ float: "right" }}>
                  <Button
                    disableElevation
                    variant="outlined"
                    color="primary"
                    onClick={getConfigs}
                    sx={{ float: "right" }}
                  >
                    Обновить
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12} justifyContent="center">
                <ButtonGroup>
                  <Button
                    disableElevation
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpen}
                  >
                    Создать
                  </Button>
                  <Button
                    disableElevation
                    variant="outlined"
                    color="primary"
                    onClick={getConfigs}
                    sx={{ float: "right" }}
                  >
                    Обновить
                  </Button>
                </ButtonGroup>
              </Grid>
            )}
          </Grid>

          {/* Окно с редактированием конфигурации START */}
          <Dialog open={snapState.open} onClose={handleClose}>
            {configStatus.id ? (
              <DialogTitle>Изменение конфигурации</DialogTitle>
            ) : (
              <DialogTitle>Создание конфигурации</DialogTitle>
            )}
            {token && (
              <Box m={1}>
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
                  value={snapConf.title}
                  onChange={(e) => (configStatus.title = e.target.value)}
                  fullWidth={true}
                  // defaultValue={snapConf.title}
                  label="Название"
                  color="info"
                  variant="filled"
                />

                <TextField
                  value={snapConf.APIKey}
                  onChange={(e) => (configStatus.APIKey = e.target.value)}
                  fullWidth={true}
                  // defaultValue={snapConf.APIKey}
                  label="Api ключ"
                  color="info"
                  variant="filled"
                />
                <TextField
                  value={snapConf.deviceToken}
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
                    value={snapConf.system}
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
        </Box>
      )}
      {/* Окно с редактированием конфигурации  END*/}

      <div className="config__list">
        <Grid container>
          <Grid item xs={12}>
            {isLoading && (
              <div>
                <Typography variant="h1">
                  <Skeleton sx={{ bgcolor: "#eee" }} />
                </Typography>
                <Typography variant="h3">
                  <Skeleton sx={{ bgcolor: "#e3e3e3" }} />
                </Typography>
                <Typography variant="h2">
                  <Skeleton sx={{ bgcolor: "#ececec" }} />
                </Typography>
              </div>
            )}
            {error && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {error}
              </Alert>
            )}
          </Grid>
        </Grid>
        {configs &&
          !isLoading &&
          configs
            .sort((a, b) => b.timeCreateConfig - a.timeCreateConfig)
            .map((doc, index) => (
              <ConfigItem
                remove={handleRemove}
                update={handleUpdate}
                key={doc.id}
                index={index + 1}
                config={doc}
              />
            ))}
      </div>
    </div>
  );
};

export default ConfigContainer;
