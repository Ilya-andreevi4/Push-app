import { Grid, Typography} from "@mui/material";
import ConfigContainer from "./ConfigList/ConfigContainer";
import PushCreator from "./PushList/PushCreator";
import PushList from "./PushList/PushList";


function Main() {
  return (
    <div className="Content">
      <Grid container
        direction="row"
        alignItems="stretch"
        justifyContent="flex-start"
        sx={{p:0, ml:0}}
      >
        <Grid item xs={4}
          alignItems="stretch"
          sx={{
            p:2,
            height: "100vh",
            boxShadow: 3
          }}
        >
          <Typography variant="h5" gutterBottom align="center" mt={1} mb={1}>
              Мои Конфигурации
          </Typography>
          <ConfigContainer />
        </Grid>
        <Grid item xs={5} 
          alignItems="stretch"
          sx={{
            mt:2,
            p:2,
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
              Создание Пуш-уведомлений
          </Typography>
          <PushCreator />
        </Grid>
        <Grid item xs={3} 
          alignItems="stretch"
          sx={{
            justifyContent:"flex-end",
            p:2,
            pr:3,
            pl:3,
            boxShadow: 3
          }}
        >
          <Typography variant="h5" gutterBottom align="center" mt={1} mb={1}>
              История сообщений
          </Typography>
          <PushList />
        </Grid>
      </Grid>
    </div>
  )
}

export default Main