import { Button, Typography} from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateConfigDialog from "./CreateConfigDialog";
import { IConfig } from "../../../app/models/IConfig";
import { configAPI } from "../../../services/ConfigService";
import ConfigItem from "./ConfigItem";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const ConfigContainer = () => {
  
  const [configs, setConfigs] = useState([]);
  const configsCollectionsRef = collection(db, "configs")

  useEffect(() => {
    const getConfigs = async () => {
      const data = await getDocs(configsCollectionsRef);
      console.log(data);
      
      // setConfigs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getConfigs();
  }, [])

  const {data: localConfigs, error, isLoading, refetch} = configAPI.useFetchAllConfigsQuery(10)
  const [deleteConfig] = configAPI.useDeleteConfigMutation()
  
  
  const handleRemove = (config:IConfig) => {
    deleteConfig(config)
  }


  return (
    <div>
      {localConfigs && 
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
        {localConfigs && localConfigs.map(config =>
          <ConfigItem remove={handleRemove} key={config.id} config={config}/>
        )}
        {/* {configs.map(config =>
          <ConfigItem remove={handleRemove} key={config.id} config={config}/>
        )} */}
      </div>
    </div>
  )
}

export default ConfigContainer