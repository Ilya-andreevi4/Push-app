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
import { state } from "../../../services/provider/updateState";
import ConfigItem from "./ConfigItem";

const ConfigContainer = () => {
  const [title, setTitle] = React.useState("");
  const [system, setSystem] = React.useState("");
  const [timeCreate, setTimeCreate] = React.useState<Date>();
  const [message, setMessage] = useState({
    error: false,
    msg: "Введите данные",
    style: "info",
  });
  const [configs, setConfigs] = useState<IConfig[]>([]);
  const [configId, setConfigId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const systems = [
    { id: 1, systemName: "IOS Push" },
    { id: 2, systemName: "Android Push" },
    { id: 3, systemName: "Web Desktop" },
  ];

  const updateState = () => {
    state.config_status = !state.config_status;
  };

  const matches = useMediaQuery("(max-width:377px)");
  const desctopIfc = useMediaQuery("(min-width:1150px)");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle("");
    setSystem("");
    setConfigId("");
    setOpen(false);
    setMessage({ error: false, msg: "Введите данные", style: "info" });
  };

  const handleCreate = async (data: any) => {
    setIsLoading(true);
    setMessage({ error: false, msg: "Введите данные", style: "info" });
    if (title === "" || system === "") {
      setMessage({
        error: true,
        msg: "Нужно заполнить оба поля!",
        style: "error",
      });
      setIsLoading(false);
      return;
    }
    try {
      if (configId) {
        const updateConfig: IConfig = {
          id: configId,
          title,
          system,
          timeCreate,
        };
        await ConfigDataServices.updateConfig(configId, updateConfig);
        setMessage({
          error: false,
          msg: "Конфигурация изменена успешно!",
          style: "success",
        });
      } else {
        const time = new Date();
        const newConfig = { title, system, timeCreate: time };
        await ConfigDataServices.addConfig(newConfig);
        setMessage({
          error: false,
          msg: "Создана новая конфигурация!",
          style: "success",
        });
      }
    } catch (e: any) {
      setMessage({ error: true, msg: e.message, style: "error" });
    } finally {
      getConfigs();
      updateState();
      setIsLoading(false);
      setConfigId("");
      setTitle("");
      setSystem("");
    }
  };

  const getConfigs = async () => {
    setError("");
    try {
      setIsLoading(true);
      const data = await ConfigDataServices.getAllConfigs();
      setConfigs(
        data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id } as any))
      );
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id: any) => {
    setMessage({ error: false, msg: "Введите данные", style: "info" });
    try {
      await ConfigDataServices.deleteConfig(id);
    } catch (e: any) {
      setMessage({ error: true, msg: e.message, style: "error" });
    } finally {
      getConfigs();
      setIsLoading(false);
      setConfigId("");
      setTitle("");
      setSystem("");
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSystem(event.target.value as any);
  };

  const handleUpdate = async (updatedConfig: IConfig) => {
    setOpen(true);
    setConfigId(updatedConfig.id);
    setTitle(updatedConfig.title);
    setSystem(updatedConfig.system);
    setSystem(updatedConfig.system);
    setTimeCreate(updatedConfig.timeCreate);
  };

  useEffect(() => {
    getConfigs();
  }, []);

  return (
    <div className="ConfigContainer">
      {configs && (
        <Box>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Grid item xs={12}>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                sx={{ mt: "2rem", mb: "1rem" }}
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
          <Dialog open={open} onClose={handleClose}>
            {configId ? (
              <DialogTitle>Изменение конфигурации</DialogTitle>
            ) : (
              <DialogTitle>Создание конфигурации</DialogTitle>
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
                  handleCreate({ title, system });
                }}
              >
                <TextField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth={true}
                  defaultValue={title}
                  color="info"
                  label="Название"
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
                    value={system}
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
                  <Button variant="contained" onClick={() => setOpen(false)}>
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
                    {configId ? "Изменить" : "Создать"}
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
        </Box>
      )}
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
          configs
            .sort((a, b) => b.timeCreate - a.timeCreate)
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
