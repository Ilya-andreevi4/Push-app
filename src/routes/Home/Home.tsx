import { Grid, Typography, Box} from "@mui/material";
import ConfigContainer from "./ConfigList/ConfigContainer";
import PushCreator from "./PushList/PushCreator";
import PushList from "./PushList/PushList";


function Home() {
  return (
    <Box 
      maxWidth="xl"
      sx={{
        p:0,
        ml:0
      }}
    >
      <Grid container
        direction="row"
        alignItems="stretch"
        justifyContent="flex-start"
        sx={{p:0, ml:0}}
      >

        <Grid item xs={5}
          alignItems="stretch"
          sx={{
            p:2,
            height: "100vh",
            boxShadow: 3
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
              Мои Конфигурации
          </Typography>
          <ConfigContainer />
        </Grid>


        <Grid item xs={5} 
          alignItems="stretch"
          sx={{
            mt:"2rem",
            p:2,
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
              Создание Пуш-уведомлений
          </Typography>
          
          <PushCreator />
          
        </Grid>
        <Grid item xs={2} 
          alignItems="stretch"
          sx={{
            justifyContent:"flex-end",
            p:2,
            boxShadow: 3
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
              История сообщений
          </Typography>
          <PushList />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home