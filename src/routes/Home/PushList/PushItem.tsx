import { Button, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { IPush } from '../../../app/models/IPush';

interface PushItemProps {
  push: IPush;
  remove: (push: IPush) => void;
}

const PushItem: FC<PushItemProps> = ({push, remove}) => {

  const handleRemove = (event: React.MouseEvent) => {
    remove(push)
  }
  
  return (
    <Grid container className="push">
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            {push.date} 
          </Grid>
          <Grid item xs={12}>
            {push.idConfigs}. {push.message} 
          </Grid>
        <Typography variant="caption" >Сообщение успешно отправлено</Typography> 
        </Grid>               
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handleRemove}
          variant="contained"
          color="warning"
          sx={{
            height:20,
            width:15,
            m:2,
          }}
        >
          Delete
        </Button>        
      </Grid>
    </Grid> 
  )
}
export default PushItem