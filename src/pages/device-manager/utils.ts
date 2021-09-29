export const getDeviceTypeByDeviceId = (deviceId: string) => {
  const deviceType = {
    '4F00CAB1': 'Temperature & Humidity',
    '4F00CAA2': 'Temperature & Humidity',
    '4F023549': 'Energy meter',
    '4F02354D': 'Energy meter',
    '4F023543': 'Energy meter',
    '4F023545': 'Water meter',
    '4F023553': 'Water level',
  }[(deviceId || '').toUpperCase()];

  return deviceType;
};

export const getDeviceTypeDataFormatByDeviceId = (deviceId: string) => {
  const tempHumi = [
    {
      label: 'Temperature',
      value: 'TEMPERATURE',
    },
    {
      label: 'Humidity',
      value: 'HUMIDITY',
    },
  ];

  const energyMeter = [
    {
      label: 'Active energy',
      value: 'ACTIVE_ENERGY',
    },
    {
      label: 'Reactive energy',
      value: 'REACTIVE_ENERGY',
    },
    {
      label: 'Current A',
      value: 'CURRENT_A',
    },
    {
      label: 'Current B',
      value: 'CURRENT_B',
    },
    {
      label: 'Current C',
      value: 'CURRENT_C',
    },
  ];

  const waterMeter = [
    {
      label: 'Conversion',
      value: 'CONVERSION',
    },
  ];

  const waterLevel = [
    {
      label: 'Water level',
      value: 'WATER_LEVEL',
    },
    {
      label: 'Voltage level',
      value: 'VOLTAGE_LEVEL',
    },
  ];

  const deviceType = {
    '4F00CAB1': tempHumi,
    '4F00CAA2': tempHumi,
    '4F023549': energyMeter,
    '4F02354D': energyMeter,
    '4F023543': energyMeter,
    '4F023545': waterMeter,
    '4F023553': waterLevel,
  }[(deviceId || '').toUpperCase()];

  return deviceType;
};
