export interface IPush {
  id?: number;
  configsSetting: {
    id: any;
    title: string;
    deviceToken:any;
    APIKey:string;
    system: any;
    timeCreateConfig: any;
  };
  title: string;
  message: string;
  image?:any;
  pushDate: any;
  timePush: any;
}