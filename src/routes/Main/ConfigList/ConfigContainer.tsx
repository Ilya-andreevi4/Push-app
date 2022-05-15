import { Button, Typography} from "@mui/material";
import React from "react";
import CreateConfigDialog from "./CreateConfigDialog";
import { IConfig } from "../../../app/models/IConfig";
import { configAPI } from "../../../services/ConfigService";
import ConfigItem from "./ConfigItem";

const ConfigContainer = () => {

  const {data: configs, error, isLoading, refetch} = configAPI.useFetchAllConfigsQuery(10)
  const [deleteConfig] = configAPI.useDeleteConfigMutation()
  
  
  const handleRemove = (config:IConfig) => {
    deleteConfig(config)
  }


  return (
    <div>
      {configs && 
        <CreateConfigDialog />
      }
      
      <div className="config__list">
        <Button 
          color="secondary" 
          onClick={() => refetch()}
          sx={{float:"right", mb:1}}
        >
          Refetch
        </Button>
        {isLoading && 
          <Typography>
            Идёт загрузка конфигов...
          </Typography>
        }
        {error && 
          <Typography>
            Произошла ошибка при загрузке конфигов.
          </Typography>
        }
        {configs && configs.map(config =>
          <ConfigItem remove={handleRemove} key={config.id} config={config}/>
        )}
      </div>
    </div>
  )
}

export default ConfigContainer