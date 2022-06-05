import { proxy } from "valtio";

interface stateProxy {
  status_push: boolean,
  config_status: boolean,
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

export {state};
export {userToken};

