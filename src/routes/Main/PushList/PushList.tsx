import { Button, Grid, Typography} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IPush } from "../../../app/models/IPush";
import PushDataServices from "../../../services/PushService";
import PushItem from "./PushItem";

const PushList = () => {
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [push, setPush] = useState<IPush[]>([]);

  const getPushs = async () => {
    setError("");
    try{
      setIsLoading(true);
      const data = await PushDataServices.getAllPushs();
      setPush(data.docs.map((doc: any) => ({...doc.data(), id: doc.id} as any)));
    } catch (e:any) {
      setError(e.message);
    } finally{
      setIsLoading(false);
    }
  }
  
  const handleRemove = async (id:any) => {
    setError("");
    try{
      await PushDataServices.deletePush(id);
    } catch (e:any) {
      setError(e.message);
    } finally{
      setIsLoading(false);
      getPushs();
    }
  }

  useEffect(() => {
    getPushs();
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          {isLoading && 
            <Typography>
              Идёт загрузка сообщений...
            </Typography>
          }
          {error && 
            <Typography>
              {error}
              Произошла ошибка при загрузке сообщений.
            </Typography>
          }
        </Grid>
        <Grid item xs={6}>
          {push &&
            (<Button 
              color="secondary" 
              onClick={getPushs}
              sx={{float:"right", mb:1}}
            >
              Refetch
            </Button>)
          }

        </Grid>
        <Grid item xs={12}>
          <div className="message_list">
            {push && push.map(push =>
              <PushItem remove={handleRemove} key={push.id} push={push}/>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default PushList