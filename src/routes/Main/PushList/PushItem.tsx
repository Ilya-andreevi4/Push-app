import { Button, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { IPush } from '../../../app/models/IPush';

interface PushItemProps {
  push: IPush;
  remove: (id: number) => void;
}

const PushItem: FC<PushItemProps> = ({push, remove}) => {

  const handleRemove = (event: React.MouseEvent) => {
    remove(push.id)
  }
  
  return (
    <Grid container className="push" >
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant='caption'>
                  {push.idConfigs}
                </Typography> 
              </Grid>
              <Grid item xs={6}>
                <Typography variant='caption' sx={{float:"right"}}> 
                  {push.pushDate} 
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} wrap="nowrap">
            <Typography variant='h6' >
             {push.message}
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
              size="small"
              variant="outlined"
              color="error"
              sx={{
                float:'right',
                mt:1
              }}
            >
              Удалить
            </Button>
          </Grid>
        </Grid>      
      </Grid>
    </Grid> 
  )
}
export default PushItem