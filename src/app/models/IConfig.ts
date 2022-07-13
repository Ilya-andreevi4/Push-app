export interface IConfig {
  id?: any;
  title: string;
  deviceToken: any;
  APIKey: string;
  system: any;
  timeCreateConfig: any;
}

export interface LocalConfigs {
  configs?: IConfig[];
}
