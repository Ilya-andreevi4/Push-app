import { proxy } from "valtio";

interface stateProxy {
  status_push: boolean,
  config_status: boolean,
}
const state:stateProxy = proxy({
  status_push:false,
  config_status: false,
});

export {state};

