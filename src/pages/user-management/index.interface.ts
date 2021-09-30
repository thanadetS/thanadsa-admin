export interface ColumnType {
  key: string;
  userName: string;
  email: string;
}

export enum DeviceManageCondition {
  greaterThan = 'Greater_Than',
  lowerThan = 'Lower_Than',
  equal = 'Equal',
}

export interface DeviceManageAlert {
  device: string;
  conditionType: string;
  conditionValue: string;
}

export interface ColumnDeviceManage {
  deviceId: string;
  deviceName: string;
  customer: string;
  alertList: DeviceManageAlert[];
}

export interface UserData {
  id: string;
  userName: string;
  password: string;
  email: string;
  userImage: string;
  rowNumber?: number;
}

export interface FileUploadType {
  uid: string;
  name: string;
  status: string;
  url: string;
}

export enum FileUploadTaskState {
  CANCELED = 'CANCELED',
  ERROR = 'ERROR',
  PAUSED = 'PAUSED',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
}

export interface UserDeviceData {
  id: string;
  deviceId: string;
  deviceType: string;
  isAlert: boolean;
  rowNumber?: number;
}

export interface SelectDeviceData {
  deviceId: string;
  deviceType: string;
  isAlert: boolean;
  isAdd: boolean;
}
