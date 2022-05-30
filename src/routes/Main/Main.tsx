import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import ConfigContainer from "./ConfigList/ConfigContainer";
import PushCreator from "./PushList/PushCreator";
import PushList from "./PushList/PushList";

function Main() {
  const matches = useMediaQuery("(max-width:767px)");

  return (
    <div>
      {matches ? (
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Box className="configs_mob">
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom align="center" sx={{mt:"3rem", mb:"1rem"}}>
                  Мои Конфигурации
                </Typography>
              </Grid>
              <Grid item xs={12} className="config_list">
                <ConfigContainer />
              </Grid>
            </Grid>
          </Box>
          <Box maxWidth="sm" className="create_push_form_mob">
            <Typography variant="h5"  align="center" sx={{mt:"5rem", mb:"1rem"}}>
              Создание Пуш-уведомлений
            </Typography>
            <PushCreator />
          </Box>
          <Box maxWidth="xs" className="message_history_mob">
            <Typography variant="h5"  align="center" sx={{mt:"3rem", mb:"1rem"}}>
              История сообщений
            </Typography>
            <PushList />
          </Box>
        </Stack>
      ) : (
        <Stack direction="row" alignItems="flex-start" spacing={0}>
          <Box className="configs">
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h5"  align="center" sx={{mt:"3rem", mb:"1rem"}}>
                  Список конфигураций
                </Typography>
              </Grid>
              <Grid item xs={12} className="config_list">
                <ConfigContainer />
              </Grid>
            </Grid>
          </Box>
          <Box maxWidth="sm" className="create_push_form" >
            <Typography variant="h5"  align="center" sx={{mt:"3rem", mb:"1rem"}}>
              Создание Пуш-уведомлений
            </Typography>
            <PushCreator />
          </Box>
          <Box maxWidth="xs" className="message_history">
            <Typography variant="h5"  align="center" sx={{mt:"3rem", mb:"1rem"}}>
              История сообщений
            </Typography>
            <PushList />
          </Box>
        </Stack>
      )}
    </div>
  );
}

export default Main;
