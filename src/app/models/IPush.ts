export interface IPush {
  id?: string;
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


export interface LocalPushs {
  pushs?: IPush[];
}