import { Button, Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import ConfigDataServices from "../../../services/FBConfigServices";
import PushDataServices from "../../../services/FBPushService";
import { IConfig } from "../../../app/models/IConfig";

export function PushCreator() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = React.useState("");
  const [ConfigId, setConfigId] = React.useState("");
  const [error, setError] = useState("");
  const [configs, setConfigs] = useState<IConfig[]>([]);

 
  const handleChange = (event: SelectChangeEvent) => {
    setConfigId(event.target.value as any);
  };

  const getConfigs = async () => {
    setError("");
    try{
      setIsLoading(true);
      const data = await ConfigDataServices.getAllConfigs();
      setConfigs(data.docs.map((doc: any) => ({...doc.data(), id: doc.id} as any)));
    } catch (e:any) {
      setError(e.message);
    } finally{
      setIsLoading(false);
    }
  }

  const handleSubmit = async (idConfigs:any, message:any) => {
      try {
        setIsLoading(true)
        const pushDate = new Date().toDateString();
        const newPush ={idConfigs, message, pushDate};
        await PushDataServices.addPush(newPush)
      } catch (e){
        console.log(e)
      } finally{
        setIsLoading(false)
    }
  }

  useEffect(() => {
    getConfigs();
  }, []);

  return (
    <Container maxWidth="xs" >
      <div className="push-create-container">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box >
              {isLoading && 
                <Typography>
                  Идёт загрузка конфигов...
                </Typography>
              }
              {error && 
                <Typography>
                  Произошла ошибка при загрузке конфигов.
                </Typography>
              }
              {configs &&
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Config</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ConfigId}
                  label="Config"
                  onChange={handleChange}
                >
                  {configs.map((config, index) =>
                    <MenuItem key={config.id} value={[config.title, ' - ', config.system].toString().split(',').join('')}>{index + 1}. {config.title} - {config.system}</MenuItem>
                  )}
                </Select>
              </FormControl>
              }
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
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
export default PushCreator;