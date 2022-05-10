import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { configAPI } from "../../services/ConfigService";
import { IConfig } from "./IConfig";

export function CreateConfigDialog() {
  
  const [isLoading, setIsLoading] = useState(false);
  const {register, handleSubmit} = useForm();
  const [open, setOpen] = React.useState(false);

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
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Добавить
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Config</DialogTitle>
        <form onSubmit={handleSubmit(handleCreate)}>
          <TextField
            name="title"
            margin="normal"
            id="title"
            inputRef={register}
            fullWidth={true}
            label="Title"
            variant="filled"
          />
          <TextField
            name="system"
            margin="normal"
            id="system"
            inputRef={register}
            label="System"
            defaultValue=""
            fullWidth
            variant="standard"
          />
          <Button onClick={handleClose} 
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            Create
          </Button>
        </form>
      </Dialog>
    </div>
  );
}

export default CreateConfigDialog