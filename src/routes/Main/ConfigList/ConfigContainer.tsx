import {
  Alert,
  Button,
  Container,
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
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IConfig } from "../../../app/models/IConfig";
import ConfigDataServices from "../../../services/ConfigServices";
import { Loader } from "../Loader";
import { state } from "../PushList/updateState";
import ConfigItem from "./ConfigItem";

const ConfigContainer = () => {
  const [title, setTitle] = React.useState("");
  const [system, setSystem] = React.useState("");
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
    {id: 1, systemName: "IOS Push"},
    {id: 2, systemName: "Android Push"},
    {id: 3, systemName: "Web Desktop"},
  ]

  const updateState = () => {
    state.config_status = !state.config_status;
  };

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
        const updateConfig: IConfig = { id: configId, title, system };
        await ConfigDataServices.updateConfig(configId, updateConfig);
        setMessage({
          error: false,
          msg: "Конфигурация изменена успешно!",
          style: "success",
        });
      } else {
        const newConfig = { title, system };
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
    console.log(updatedConfig);
    setOpen(true);
    setConfigId(updatedConfig.id);
    setTitle(updatedConfig.title);
    setSystem(updatedConfig.system);
  };

  useEffect(() => {
    getConfigs();
  }, []);

  return (
    <div>
      {configs && (
        <Container>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClickOpen}
              >
                Новая конфигурация
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                color="secondary"
                onClick={getConfigs}
                sx={{ float: "right" }}
              >
                Обновить
              </Button>
            </Grid>
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
                  label="Название"
                  variant="filled"
                />
                <FormControl fullWidth sx={{mt: 1}}>
                  <InputLabel id="select-label-system">Система</InputLabel>
                  <Select
                    labelId="select-label-system"
                    id="select-system"
                    value={system}
                    label="Система"
                    onChange={handleChange}
                  >
                    {systems.map((system) => (
                      <MenuItem 
                        key={system.id}
                        value={system.systemName}
                      >
                        {system.id}: {system.systemName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <TextField
                  value={system}
                  onChange={(e) => setSystem(e.target.value)}
                  fullWidth={true}
                  defaultValue={system}
                  label="Система"
                  variant="filled"
                /> */}
              </form>
            </DialogContent>
            <DialogActions>
              <Grid container justifyContent="space-evenly" mb={1}>
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
        </Container>
      )}
      <div className="config__list">
        <Grid container>
          <Grid item xs={12}>
            {isLoading && <Loader />}
            {error && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {error}
              </Alert>
            )}
          </Grid>
        </Grid>
        {configs &&
          configs.map((doc, index) => (
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
