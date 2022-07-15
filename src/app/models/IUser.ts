import { IConfig } from "./IConfig";
import { IPush } from "./IPush";

export interface IUser {
  configs?: IConfig[];
  pushs?: IPush[];
  uid:string;
  email: any;
  password?: string;
  token?: string;
  id?: string;
  timestamp?: any;
}
