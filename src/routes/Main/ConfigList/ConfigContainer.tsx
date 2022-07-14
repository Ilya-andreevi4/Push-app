import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IConfig, LocalConfigs } from "../../../app/models/IConfig";
import ConfigDataServices from "../../../services/ConfigServices";
import {
  configStatus,
  localConfigs,
  state
} from "../../../services/provider/proxyStates";
import ConfigItem from "./ConfigItem";
import { useSnapshot } from "valtio";
import { useUserAuth } from "../../../services/provider/AuthProvider";
import CreateFormConfig from "./CreateFormConfig";

const ConfigContainer = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const snapConfigs = useSnapshot(localConfigs);
  const matches = useMediaQuery("(max-width:377px)");
  const desctopInterface = useMediaQuery("(min-width:1150px)");

  const { user } = useUserAuth();

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

  const handleClickOpen = () => {
    state.open = true;
  };

  const getConfigs = async () => {
    setError("");
    try {
      setIsLoading(true);
      if (user) {
        const data = await ConfigDataServices.getAllConfigs(user.uid);
        localConfigs.configs = data.docs.map(
          (doc: any) => ({ ...doc.data(), id: doc.id } as any)
        );
      } else {
        setError(
          "Зарегистрируйтесь или войдите в существующий аккаунт, чтобы сохранить созданные конфигурации."
        );
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
      setError(e.message);
      console.log(e);
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id: any) => {
    if (user) {
      try {
        await ConfigDataServices.deleteConfig(id, user.uid);
      } catch (e: any) {
        console.error(e.message);
      } finally {
        updateState();
      }
    } else {
      localConfigs.configs.map((c: IConfig) => {
        if (c.id === id) {
          var configIndex = localConfigs.configs.indexOf(c);
          return localConfigs.configs.splice(configIndex, 1);
        } else return c;
      });
      await sessionStorage.setItem("configs", JSON.stringify(localConfigs));
      updateState();
    }
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
      {snapConfigs && (
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
                    onClick={() => getConfigs()}
                    sx={{ float: "right" }}
                  >
                    Обновить
                  </Button>
                </ButtonGroup>
              </Grid>
            ) : desctopInterface ? (
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

          <CreateFormConfig/>
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

        {snapConfigs &&
          !isLoading &&
          localConfigs.configs
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
