import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import { configAPI } from "../../../services/ConfigService";
import { IConfig } from "../../../app/models/IConfig";

export function CreateConfigDialog() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [system, setSystem] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const [createConfig] = configAPI.useCreateConfigMutation()  

  const handleCreate = async (data:any) => {

      try {
        setIsLoading(true)
        await createConfig(data as IConfig)
      } catch (e){
        console.log(e)
      } finally{
        setIsLoading(false)
    }
  }

  return (
    <Container>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Добавить
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Config</DialogTitle>
        <DialogContent>
        <form
            id="myform"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate({title, system});
              handleClose();
            }}
          >
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth={true}
            label="Title"
            variant="filled"
          />
          <TextField
            value={system}
            onChange={(e) => setSystem(e.target.value)}
            fullWidth={true}
            label="System"
            variant="filled"
          />
          </form>
          </DialogContent>
          <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" form="myform" disabled={isLoading}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CreateConfigDialog;