import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import ConfigContainer from "./ConfigList/ConfigContainer";
import PushCreator from "./PushList/PushCreator";
import PushList from "./PushList/PushList";

function Main() {
  const matches = useMediaQuery("(max-width:900px)");

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
            <Grid className="config_list">
              <ConfigContainer />
            </Grid>
          </Box>
          <Box maxWidth="sm" className="create_push_form_mob">
            <PushCreator />
          </Box>
          <Box maxWidth="xs" className="message_history_mob">
            <PushList />
          </Box>
        </Stack>
      ) : (
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch"
          spacing={2}
        >
          <Box className="configs">
            <Grid className="config_list">
              <ConfigContainer />
            </Grid>
          </Box>
          <Box maxWidth="sm" className="create_push_form">
            <PushCreator />
          </Box>
          <Box maxWidth="xs" className="message_history">
            <PushList />
          </Box>
        </Stack>
      )}
    </div>
  );
}

export default Main;
