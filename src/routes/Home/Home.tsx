import { Grid, Typography, Box} from "@mui/material";
import ConfigContainer from "./ConfigList/ConfigContainer";
import PushCreator from "./PushCreator/PushCreator";


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
          <Typography variant="h5" gutterBottom>
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
          <Typography variant="h5" gutterBottom>
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
          <Typography variant="body1" gutterBottom>
              This is demo app with login, registration and updating profile
              flows. This is demo app with login, registration and updating profile
              flows.This is demo app with login, registration and updating profile
              flows. This is demo app with login, registration and updating profile
              flows.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home