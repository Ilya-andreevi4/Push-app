import { Button, Typography} from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateConfigDialog from "./CreateConfigDialog";
import { IConfig } from "../../../app/models/IConfig";
import { configAPI } from "../../../services/ConfigService";
import ConfigDataServices from "../../../services/FBConfigServices";
import ConfigItem from "./ConfigItem";

const ConfigContainer = () => {

  const {data: localConfigs, error, isLoading, refetch} = configAPI.useFetchAllConfigsQuery(10)
  const [deleteConfig] = configAPI.useDeleteConfigMutation()
  
  const [configs, setConfigs] = useState<IConfig[]>([]);

  const getConfigs = async () => {
    const data = await ConfigDataServices.getAllConfigs();
    setConfigs(data.docs.map((doc: any) => ({...doc.data(), id: doc.id} as any)))
  }

  useEffect(() => {
    getConfigs();
  }, [configs]);
  
  const handleRemove = async (id:any) => {
    await ConfigDataServices.deleteConfig(id);
    getConfigs();
  }


  return (
    <div>
      {configs && 
        <CreateConfigDialog />
      }
      
      <div className="config__list">
        <Button 
          color="secondary" 
          onClick={getConfigs}
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
        {configs && configs.map((doc, index) =>
          <ConfigItem 
            remove={handleRemove} 
            key={doc.id} 
            index={index + 1} 
            config={doc}
          />
        )}
      </div>
    </div>
  )
}

export default ConfigContainer