import type { UserData } from '@/pages/user-management/index.interface';
import { db } from '../../services/firebase';

const usersCollection = db.collection('users');

export const createNewUser = async (user: UserData) => {
  await usersCollection.add({
    userName: user.userName,
    password: user.password,
    email: user.email,
    userImage: user.userImage,
    userRole: 'user',
  });
};

export const updateUser = async (id: string, user: UserData) => {
  const options = { merge: true };
  await usersCollection.doc(id).set(user, options);
};

export const listUsers = (setUsers: (value: React.SetStateAction<UserData[]>) => void) => {
  return usersCollection.onSnapshot((items) => {
    const list: UserData[] = [];
    let rowNumber = 1;
    items.forEach((document) => {
      const documentData = document.data();
      list.push({
        id: document.id,
        userName: documentData.userName,
        password: documentData.password,
        email: documentData.email,
        userImage: documentData.userImage,
        rowNumber: rowNumber++,
      });
    });
    setUsers(list);
  });
};

export const getUserById = async (id: string) => {
  const documentRef = await usersCollection.doc(id).get();
  return documentRef.data();
};
