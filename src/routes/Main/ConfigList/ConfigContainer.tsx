import { Button, Typography} from "@mui/material";
import React from "react";
import CreateConfigDialog from "./CreateConfigDialog";
import { IConfig } from "../../../app/models/IConfig";
import { configAPI } from "../../../services/ConfigService";
import ConfigItem from "./ConfigItem";
// import { db } from "../../../firebase";
// import { collection, onSnapshot} from "firebase/firestore";

const ConfigContainer = () => {
  // const [configs, setConfigs] = useState<IConfig[]>();
  // const configsCollectionsRef = collection(db, "configs")

  // useEffect(() => {
  //   const getConfigs = async () => {
  //     try {
  //       const configList = onSnapshot(configsCollectionsRef, doc => {
  //         doc.forEach((d:any)=> {
  //           setConfigs(prev =>[...prev, d.data()])
  //         })
  //       })
  //       console.log(configList());
  //     } catch(e: any) {
  //       console.error(e);        
  //     }
      
  //   }
  //   return()=>{
  //     getConfigs()
  //   }
  // }, [])

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