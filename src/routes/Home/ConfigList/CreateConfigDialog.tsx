import { Button, Container, Dialog, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { configAPI } from "../../../services/ConfigService";
import { IConfig } from "../../../app/models/IConfig";

export function CreateConfigDialog() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const {register, handleSubmit} = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const [createConfig] = configAPI.useCreateConfigMutation()  

//   const handleCreateTest = async (data:any) => {
//     const {title, system} = data
//     await createConfig({title, system, body: data, } as IConfig)
// }

  const handleCreate = async (data:any) => {
    
    const {title, system} = data

      try {
        setIsLoading(true)
        await createConfig({title, system} as IConfig)
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
        <form onSubmit={handleSubmit(handleCreate)}>
          <TextField
            name="title"
            margin="normal"
            inputRef={register}
            fullWidth={true}
            label="Title"
            variant="filled"
          />
          <TextField
            name="system"
            margin="normal"
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
    </Container>
  );
}

export default CreateConfigDialog