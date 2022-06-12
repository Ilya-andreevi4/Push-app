import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useClipboard } from "use-clipboard-copy";
import { useSnapshot } from "valtio";
import MessageService from "../../services/MessageService";
import ConfigContainer from "./ConfigList/ConfigContainer";
import PushCreator from "./PushList/PushCreator";
import PushList from "./PushList/PushList";
import { userToken } from "../../services/provider/updateState";

const Main = () => {
  const mobIfc = useMediaQuery("(max-width:745px)");
  const desctopIfc = useMediaQuery("(min-width:930px)");
  const snap: any = useSnapshot(userToken);
  const clipboard = useClipboard();
  const token = snap.token;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    clipboard.copy()
    setAnchorEl(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  MessageService();
  return (
    <div>
      {mobIfc ? (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-end"
          spacing={3}
        >
          <Grid className="configs mob">
            <ConfigContainer />
          </Grid>
          <Box sx={{ width: "100%" }}>
            <Grid className="create_push_form mob">
              <PushCreator />
            </Grid>
          </Box>
          <Box maxWidth="xs" className="message_history mob">
            <PushList />
          </Box>
        </Stack>
      ) : desctopIfc ? (
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={1}
        >
          <Box className="configs">
            <Grid className="config_list">
              <ConfigContainer />
            </Grid>
          </Box>
          <Box maxWidth="30%">
            <Grid className="create_push_form">
              <PushCreator />
            </Grid>
          </Box>
          <Box className="message_history">
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
      {token && (
        <Box m={1}>
          <Button onClick={handleClickOpen} variant="outlined" color="info">
            Токен твоего девайса
          </Button>
          <Dialog open={open} fullWidth maxWidth={"xs"} onClose={handleClose}>
            <DialogTitle>Токен твоего девайса:</DialogTitle>
            <DialogContent>
              <input
                ref={clipboard.target}
                value={token}
                type="token"
                readOnly
              />
            </DialogContent>
            <DialogActions>
              <Button
                aria-describedby={id}
                color="info"
                onClick={handleClick}
              >
                Скопировать токен
              </Button>
              <Popover
                open={openPop}
                id={id}
                anchorEl={anchorEl}
                onClose={handleClosePop}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <Typography sx={{ p: 1, fontSize:"small",background:"#C2F235"}}>
                  Токен скопирован
                </Typography>
              </Popover>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </div>
  );
};

export default Main;
