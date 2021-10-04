import type { DeviceInfo } from '@/pages/device-manager/index.interface';
import { db } from '../../services/firebase';

const deviceUsersCollection = db.collection('device_users');

export const updateDeviceUser = async (id: string, device: DeviceInfo) => {
  const options = { merge: true };
  await deviceUsersCollection.doc(id).set(device, options);
};

export const getDeviceUserByUserName = async (userName: string) => {
  return await deviceUsersCollection.where('userName', '==', userName);
};
