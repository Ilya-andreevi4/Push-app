import { Alert, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import ConfigDataServices from "../../../services/FBConfigServices";

export function CreateConfigDialog() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [system, setSystem] = React.useState("");
  const [message, setMessage] = useState({error: false, msg:"Введите данные", style:"info"});

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }  

  const handleCreate = async (data:any) => {
    setMessage({error: false, msg:"Введите данные", style:"info"}); 

    if (title===""||system==="") {
      setMessage({error:true, msg:"Нужно заполнить оба поля!", style:"error"});
      return;
    };

    const newConfig ={
      title,
      system
    };

    try {
      setIsLoading(true)
      await ConfigDataServices.addConfig(newConfig);
      setMessage({error:false, msg:"New config added successfully!", style:"success"});
    } catch (e:any){
      setMessage({error: true, msg: e.message, style:"error"});
    } finally{
      setIsLoading(false)
    }
    setTitle("");
    setSystem("");
  }

  return (
    <Container>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Добавить
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Config</DialogTitle>
        {isLoading ? (
          <Alert severity={message.style as any}>Подождите секунду</Alert>
        ):message.error?(
          <Alert severity={message.style as any} onClose={()=> setMessage({error: false, msg: "", style: ""})}>{message.msg}</Alert>
        ):(
          <Alert severity={message.style as any}>{message.msg}</Alert>
        )}
        <DialogContent>
        <form
            id="myform"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate({title, system});
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