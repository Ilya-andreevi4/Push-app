import { Button, Typography} from "@mui/material";
import React, { useState } from "react";
import { IPush } from "../../../app/models/IPush";
import { pushAPI } from "../../../services/PushService";
import PushDataServices from "../../../services/FBPushService";
import PushItem from "./PushItem";

const PushList = () => {
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


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
  const {data: push, error, isLoading, refetch} = pushAPI.useFetchAllPushQuery(10)
  const [deletePush] = pushAPI.useDeletePushMutation()
  
  const handleRemove = (push:IPush) => {
    deletePush(push)
  }

  return (
    <div>
        <Button 
          color="secondary" 
          onClick={() => refetch()}
          sx={{float:"right", mb:1}}
        >
          Refetch
        </Button>
        {isLoading && 
          <Typography>
            Идёт загрузка сообщений...
          </Typography>
        }
        {error && 
          <Typography>
            Произошла ошибка при загрузке сообщений.
          </Typography>
        }
        {push && push.map(push =>
          <PushItem remove={handleRemove} key={push.id} push={push}/>
        )}
    </div>
  )
}

export default PushList