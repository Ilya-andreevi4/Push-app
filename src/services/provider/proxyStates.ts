import { proxy } from "valtio";

interface stateProxy {
  status_push: boolean,
  config_status: boolean,
  open: boolean,
}

interface pushCreateProxy {
  configPush: any,
  titleStatus: string,
  messageStatus: string,
  imageStatus: any,
}

interface configCreateProxy {
  id: any;
  title: string;
  deviceToken:any;
  APIKey:any;
  system: any;
  timeCreateConfig: any;
}

interface tokenProxy {
  token:string,
  id: string,
}

//*Constans*\\

const state:stateProxy = proxy({
  status_push:false,
  config_status: false,
  open: false,
});

const userToken:tokenProxy = proxy({
  token:"",
  id:"",
});
const pushStatus:pushCreateProxy = proxy({
  configPush: "",
  titleStatus: "",
  messageStatus: "",
  imageStatus: "",
});
const configStatus:configCreateProxy = proxy({
  id: "",
  title: "",
  deviceToken:"",
  APIKey:"",
  system: "",
  timeCreateConfig: "",
});

export {state};
export {userToken};
export {pushStatus};
export {configStatus};

