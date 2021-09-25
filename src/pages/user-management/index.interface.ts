export interface ColumnType {
  key: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

export enum DeviceManageCondition {
  greaterThan = 'Greater_Than',
  lowerThan = 'Lower_Than',
  equal = 'Equal'
}

export interface DeviceManageAlert {
  device: string;
  conditionChoice: string;
  conditionValue: string;
}

export interface ColumnDeviceManage {
  deviceId: string;
  deviceName: string;
  customer: string;
  alertList: DeviceManageAlert[];
}
