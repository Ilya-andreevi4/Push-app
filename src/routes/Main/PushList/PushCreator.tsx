import { Button, Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { configAPI } from "../../../services/ConfigService";
import { IPush } from "../../../app/models/IPush";
import { Box } from "@mui/system";
import { pushAPI } from "../../../services/PushService";

export function PushCreator() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = React.useState("");
  const [ConfigId, setConfigId] = React.useState("");
  
  const {data: configs, error, isLoading:apiLoading} = configAPI.useFetchAllConfigsQuery(10);
  const [createPush] = pushAPI.useCreatePushMutation();

  // Mui selector
  const handleChange = (event: SelectChangeEvent) => {
    setConfigId(event.target.value as any);
  };
  // Mui selector

  const handleSubmit = async (idConfigs:any, message:any) => {
      try {
        setIsLoading(true)
        await createPush({idConfigs, message} as IPush)
      } catch (e){
        console.log(e)
      } finally{
        setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="xs" >
      <div className="push-create-container">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box >
              {apiLoading && 
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
                  {configs.map(config =>
                    <MenuItem key={config.id} value={[config.title, ' - ', config.system].toString().split(',').join('')}>{config.id}. {config.title} - {config.system}</MenuItem>
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