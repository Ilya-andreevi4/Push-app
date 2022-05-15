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
            <Grid container>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption' 
                  sx={{
                    float:'right'
                  }}
                >
                  {push.date} 
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5'>
              {push.idConfigs}. {push.message}
            </Typography> 
          </Grid>           
        </Grid>   
      </Grid>
      <Grid item xs={12} mt={1} pt={0}>
        <Grid container>
          <Grid item xs={12}>
          <Typography variant="caption" >Сообщение успешно отправлено</Typography>            
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleRemove}
              variant="contained"
              color="error"
              sx={{
                float:'right',
                height:20,
                width:15,
                mt:1
              }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>      
      </Grid>
    </Grid> 
  )
}
export default PushItem