import { Button, Grid } from '@mui/material';
import React, { FC } from 'react';
import { IConfig } from '../../app/models/IConfig';

interface ConfigItemProps {
  config: IConfig;
  remove: (config: IConfig) => void;
  // update: (config: IConfig) => void;
}

const ConfigItem: FC<ConfigItemProps> = ({config, remove}) => {

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    remove(config)
  }
  // const handleUpdate = (event: React.MouseEvent) => {
  //   event.stopPropagation()
  //   remove(config)
  // }
  
  return (
    <Grid container className="config">
      <Grid item xs={12}>
        {config.id}. {config.title} - {config.system}          
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handleRemove}
          variant="contained"
          color="warning"
          sx={{
            height:20,
            width:15,
            mt:2,
          }}
        >
          Delete
        </Button>        
      </Grid>
    </Grid> 
  )
}
export default ConfigItem