import { Grid, Typography} from "@mui/material";
import ConfigContainer from "./ConfigList/ConfigContainer";
import PushCreator from "./PushList/PushCreator";
import PushList from "./PushList/PushList";


function Main() {
  return (
    <div className="content">
      <Grid container
        direction="row"
        alignItems="stretch"
        justifyContent="baseline"
        sx={{p:0, ml:0}}
      >
        <Grid item xs={4}
          alignItems="stretch"
          className="configs"
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom align="center">
                Мои Конфигурации
              </Typography>
            </Grid>
            <Grid item xs={12} className="config_list">
              <ConfigContainer />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5} 
          alignItems="stretch"
          sx={{
            p:1,
            pt:3
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
            pt: 3,
            pr: 1
          }}
        >
          <Typography variant="h5" gutterBottom align="center" >
              История сообщений
          </Typography>
          <PushList />
        </Grid>
      </Grid>
    </div>
  )
}

export default Main