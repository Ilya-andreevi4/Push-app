import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useSnapshot } from "valtio";
import { IConfig } from "../../../app/models/IConfig";
import { Loader } from "../Loader";

interface CreateFormConfigProps {
  config?: IConfig;
}

const CreateFormConfig: FC<CreateFormConfigProps> = ({ config }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const snap: any = useSnapshot(userToken);
  const token = snap.token;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const clipboard = useClipboard();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    clipboard.copy();
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;
  const handleClickOpenToken = () => {
    setOpen(true);
  };
  const handleCloseToken = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={snapState.open} onClose={handleClose}>
        {configStatus.id ? (
          <DialogTitle>Изменение конфигурации</DialogTitle>
        ) : (
          <DialogTitle>Создание конфигурации</DialogTitle>
        )}
        {token && (
          <Box m={2}>
            <Button
              onClick={handleClickOpenToken}
              variant="outlined"
              color="info"
            >
              Токен твоего девайса
            </Button>
            <Dialog
              open={open}
              fullWidth
              maxWidth={"xs"}
              onClose={handleCloseToken}
            >
              <DialogTitle>
                Токен твоего девайса для тестового пуш уведомления:
              </DialogTitle>
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
                  <Typography
                    sx={{ p: 1, fontSize: "small", background: "#C2F235" }}
                  >
                    Токен скопирован
                  </Typography>
                </Popover>
              </DialogActions>
            </Dialog>
          </Box>
        )}
        {isLoading ? (
          <Loader />
        ) : message.error ? (
          <Alert
            severity={message.style as any}
            onClose={() => setMessage({ error: false, msg: "", style: "" })}
          >
            {message.msg}
          </Alert>
        ) : (
          <Alert severity={message.style as any}>{message.msg}</Alert>
        )}
        <DialogContent>
          <form
            id="myform"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
          >
            <TextField
              value={snapConf.title}
              onChange={(e) => (configStatus.title = e.target.value)}
              fullWidth={true}
              // defaultValue={snapConf.title}
              label="Название"
              color="info"
              variant="filled"
            />

            <TextField
              value={snapConf.APIKey}
              onChange={(e) => (configStatus.APIKey = e.target.value)}
              fullWidth={true}
              // defaultValue={snapConf.APIKey}
              label="Api ключ"
              color="info"
              variant="filled"
            />
            <TextField
              value={snapConf.deviceToken}
              onChange={(e) => (configStatus.deviceToken = e.target.value)}
              fullWidth={true}
              // defaultValue={snapConf.deviceToken}
              label="Токен девайса"
              color="info"
              variant="filled"
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="select-label-system" color="info">
                Система
              </InputLabel>
              <Select
                labelId="select-label-system"
                color="info"
                id="select-system"
                value={snapConf.system}
                label="Система"
                onChange={handleChange}
              >
                {systems.map((system) => (
                  <MenuItem key={system.id} value={system.systemName}>
                    {system.id}: {system.systemName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="space-between" m={[0, 2, 1, 2]}>
            <Grid item>
              <Button variant="contained" onClick={() => (state.open = false)}>
                Назад
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                form="myform"
                disabled={isLoading}
              >
                {configStatus.id ? "Изменить" : "Создать"}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CreateFormConfig;
