import type { DeviceInfo } from '@/pages/device-manager/index.interface';
import { db } from '../../services/firebase';

const devicesCollection = db.collection('devices');

export const updateDevice = async (id: string, device: DeviceInfo) => {
  const options = { merge: true };
  await devicesCollection.doc(id).set(device, options);
};

export const listDevices = (
  setDevices: (value: React.SetStateAction<DeviceInfo[]>) => void,
  isRegister: boolean,
) => {
  return devicesCollection.onSnapshot((items) => {
    const list: DeviceInfo[] = [];
    items.forEach((document) => {
      const documentData = document.data();
      list.push({
        id: document.id,
        deviceId: documentData.deviceId.toUpperCase(),
        deviceType: documentData.deviceType,
        deviceName: documentData.deviceName,
        isRegister: documentData.isRegister,
      });
    });
    const result = list.filter((item) => item.isRegister === isRegister);
    setDevices(result);
  });
};

export const getDeviceById = async (id: string) => {
  const documentRef = await devicesCollection.doc(id).get();
  return documentRef.data();
};
