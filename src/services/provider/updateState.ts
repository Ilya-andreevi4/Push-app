import { proxy } from "valtio";

interface stateProxy {
  status_push: boolean,
  config_status: boolean,
}

interface pushCreateProxy {
  configPush: any,
  titleStatus: string,
  messageStatus: string,
  imageStatus: any|null,
}

interface tokenProxy {
  token:string,
}

const state:stateProxy = proxy({
  status_push:false,
  config_status: false,
});

const userToken:tokenProxy = proxy({
  token:'',
});
const pushStatus:pushCreateProxy = proxy({
  configPush: "",
  titleStatus: "",
  messageStatus: "",
  imageStatus: null,
});

export {state};
export {userToken};
export {pushStatus};

