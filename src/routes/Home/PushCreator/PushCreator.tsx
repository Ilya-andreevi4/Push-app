import { Button, Container, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { configAPI } from "../../../services/ConfigService";
import { IPush } from "../../../app/models/IPush";
import { Box } from "@mui/system";
import { pushAPI } from "../../../services/PushService";

export function PushCreator() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = React.useState("");
  const [id, setId] = React.useState("");
  
  const {data: configs, error, isLoading:apiLoading} = configAPI.useFetchAllConfigsQuery(10)
  const [createPush] = pushAPI.useCreatePushMutation()  

  // Mui selector

  const [config, setConfig] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setConfig(event.target.value as string);
  };

    // Mui selector

  const handleSubmit = async (idConfig:any, message:any) => {
      try {
        setIsLoading(true)
        console.log(idConfig, message);
        
        // await createPush (data as IPush)
      } catch (e){
        console.log(e)
      } finally{
        setIsLoading(false)
    }
  }

  return (
    <Container>
              
    <Grid container spacing={3}>
      <Grid item xs={12}>
            <TextField
              value={id}
              onChange={(e) => setId(e.target.value)}
              fullWidth={true}
              label="Config ID"
              variant="filled"
            />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ minWidth: 120 }}>
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
              value={config}
              label="Config"
              onChange={handleChange}
            >
               {configs.map(config =>
                <MenuItem value={config.id}>{config.id}. {config.title} - {config.system}</MenuItem>
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
          onClick={() => handleSubmit(id, message)}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
    </Container>
  );
}

export default PushCreator;