import { proxy } from "valtio";
import { IConfig } from "../../app/models/IConfig";
import { IPush } from "../../app/models/IPush";

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

interface localConfigsProxy{
  configs: IConfig[];
}
interface localPushsProxy{
  pushs: IPush[];
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

export const state:stateProxy = proxy({
  status_push:false,
  config_status: false,
  open: false,
});

export const userToken:tokenProxy = proxy({
  token:"",
  id:"",
});

export const pushStatus:pushCreateProxy = proxy({
  configPush: "",
  titleStatus: "",
  messageStatus: "",
  imageStatus: "",
});

export const localConfigs:localConfigsProxy = proxy({
  configs:[],
});

export const configStatus:configCreateProxy = proxy({
  id: "",
  title: "",
  deviceToken:"",
  APIKey:"",
  system: "",
  timeCreateConfig: "",
});

export const localPushs:localPushsProxy = proxy({
  pushs:[],
});
