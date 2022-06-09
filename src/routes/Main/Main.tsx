import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import ConfigContainer from "./ConfigList/ConfigContainer";
import PushCreator from "./PushList/PushCreator";
import PushList from "./PushList/PushList";

function Main() {
  const mobIfc = useMediaQuery("(max-width:745px)");
  const desctopIfc = useMediaQuery("(min-width:930px)");

  return (
    <div>
      {mobIfc ? (
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={0}
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
      ) : desctopIfc ? (
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={3}
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
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={0}
        >
          <Box className="configs tableMode">
            <Grid className="config_list">
              <ConfigContainer />
            </Grid>
          </Box>
          <Box maxWidth="sm" className="create_push_form tableMode">
            <PushCreator />
          </Box>
          <Box maxWidth="xs" className="message_history tableMode">
            <PushList />
          </Box>
        </Stack>
      )}
    </div>
  );
}

export default Main;
