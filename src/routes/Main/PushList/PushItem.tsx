import { Button, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { IPush } from "../../../app/models/IPush";

interface PushItemProps {
  push: IPush;
  remove: (id: number) => void;
}

const PushItem: FC<PushItemProps> = ({ push, remove }) => {
  const handleRemove = (event: React.MouseEvent) => {
    remove(push.id);
  };

  return (
    <Grid container className="push">
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <Typography variant="caption" gutterBottom>
                  {push.idConfigs}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ float: "right" }}
                >
                  {push.pushDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={1} mb={1}>
            <Grid
              container
              direction="row"
              wrap="nowrap"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={8}>
                <Typography variant="h6">{push.title}</Typography>
                <Typography variant="body2">{push.message}</Typography>
              </Grid>
              <Grid item xs={4} p={0} m={0}>
                {push.image && (
                  <img
                    className="post_img"
                    alt="Изображение поста"
                    src={push.image}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={0} pt={0}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Сообщение успешно отправлено
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleRemove}
              size="small"
              variant="outlined"
              color="error"
              sx={{
                float: "right",
                mt: 1,
              }}
            >
              Удалить
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PushItem;
