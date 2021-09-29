export const deviceSelected = (deviceId: string) => {
  const devices = {
    '4F00CAB1': {
      deviceName: 'test 4F00CAB1',
      customer: 'admin',
      alertList: [
        { device: 'TEMPERATURE', conditionType: 'GREATER_THAN', conditionValue: '25' },
        { device: 'HUMIDITY', conditionType: 'EQUAL', conditionValue: '40' },
        { device: 'HUMIDITY', conditionType: 'LOWER_THAN', conditionValue: '35' },
      ],
    },
    '4F00CAA2': {
      deviceName: 'test 4F00CAA2',
      customer: 'admin',
      alertList: [
        { device: 'HUMIDITY', conditionType: 'GREATER_THAN', conditionValue: '40' },
        { device: 'TEMPERATURE', conditionType: 'EQUAL', conditionValue: '30' },
      ],
    },
    '4F023549': {
      deviceName: 'test 4F023549',
      customer: 'admin',
      alertList: [
        { device: 'ACTIVE_ENERGY', conditionType: 'EQUAL', conditionValue: '20' },
        { device: 'REACTIVE_ENERGY', conditionType: 'LOWER_THAN', conditionValue: '33' },
        { device: 'CURRENT_A', conditionType: 'LOWER_THAN', conditionValue: '20' },
        { device: 'CURRENT_B', conditionType: 'EQUAL', conditionValue: '11' },
        { device: 'CURRENT_C', conditionType: 'GREATER_THAN', conditionValue: '24' },
      ],
    },
    '4F02354D': {
      deviceName: 'test 4F02354D',
      customer: 'admin',
      alertList: [
        { device: 'CURRENT_A', conditionType: 'LOWER_THAN', conditionValue: '77' },
        { device: 'ACTIVE_ENERGY', conditionType: 'EQUAL', conditionValue: '33' },
        { device: 'CURRENT_B', conditionType: 'EQUAL', conditionValue: '21' },
        { device: 'CURRENT_C', conditionType: 'GREATER_THAN', conditionValue: '10' },
        { device: 'REACTIVE_ENERGY', conditionType: 'LOWER_THAN', conditionValue: '9' },
      ],
    },
    '4F023543': {
      deviceName: 'test 4F023543',
      customer: 'admin',
      alertList: [
        { device: 'CURRENT_C', conditionType: 'GREATER_THAN', conditionValue: '55' },
        { device: 'CURRENT_A', conditionType: 'LOWER_THAN', conditionValue: '67' },
        { device: 'CURRENT_B', conditionType: 'EQUAL', conditionValue: '98' },
        { device: 'ACTIVE_ENERGY', conditionType: 'EQUAL', conditionValue: '56' },
        { device: 'REACTIVE_ENERGY', conditionType: 'LOWER_THAN', conditionValue: '32' },
      ],
    },
    '4F023545': {
      deviceName: 'test 4F023545',
      customer: 'admin',
      alertList: [
        { device: 'CONVERSION', conditionType: 'GREATER_THAN', conditionValue: '34' },
        { device: 'CONVERSION', conditionType: 'EQUAL', conditionValue: '56' },
      ],
    },
    '4F023553': {
      deviceName: 'test 4F023553',
      customer: 'admin',
      alertList: [
        { device: 'WATER_LEVEL', conditionType: 'GREATER_THAN', conditionValue: '45' },
        { device: 'VOLTAGE_LEVEL', conditionType: 'LOWER_THAN', conditionValue: '32' },
        { device: 'WATER_LEVEL', conditionType: 'EQUAL', conditionValue: '50' },
      ],
    },
  }[(deviceId || '').toUpperCase()];

  return devices;
};
