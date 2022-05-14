import { Button, Typography} from "@mui/material";
import React from "react";
import { IPush } from "../../../app/models/IPush";
import { pushAPI } from "../../../services/PushService";
import PushItem from "./PushItem";

const PushList = () => {

  const {data: push, error, isLoading, refetch} = pushAPI.useFetchAllPushQuery(10)
  const [deletePush] = pushAPI.useDeletePushMutation()
  
  const handleRemove = (push:IPush) => {
    deletePush(push)
  }

  return (
    <div>
        <Button 
            color="secondary" 
            onClick={() => refetch() 
          }>
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