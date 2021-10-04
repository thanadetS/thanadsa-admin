export interface ColumnType {
  deviceId: string;
  deviceType: string;
}

export enum DeviceManageCondition {
  greaterThan = 'GREATER_THAN',
  lowerThan = 'LOWER_THAN',
  equal = 'EQUAL',
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

export interface MsgParam {
  subCmd: string;
  subType: string;
  deviceUid: string;
  data: string;
  dataEncrypt: string;
}

export interface DeviceData {
  msgDirect: string;
  msgPriority: string;
  msgType: string;
  msgId: number;
  apTime: number;
  msgEncrypt: string;
  msgUid: string;
  msgCmd: string;
  apUid: string;
  msgParam: MsgParam;
}

export interface DeviceInfo {
  id?: string;
  deviceId: string;
  deviceType?: string;
  deviceName: string;
  isRegister: boolean;
}
