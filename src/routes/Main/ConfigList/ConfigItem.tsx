import { Button, Grid } from '@mui/material';
import React, { FC } from 'react';
import { IConfig } from '../../../app/models/IConfig';

interface ConfigItemProps {
  config: IConfig;
  index: number;
  remove: (id: number) => void;
  // update: (config: IConfig) => void;
}

const ConfigItem: FC<ConfigItemProps> = ({config, index, remove}) => {

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    remove(config.id)
  }
  // const handleUpdate = (event: React.MouseEvent) => {
  //   event.stopPropagation()
  //   remove(config)
  // }
  
  return (
    <Grid container className="config">
      <Grid item xs={12}>
        {index}. {config.title} - {config.system}          
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handleRemove}
          variant="contained"
          color="error"
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