import { useEffect, useState } from 'react';
import { Button, Col, Divider, Row, Space } from 'antd';
import { Table } from 'antd';
import type { UserData } from './index.interface';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styles from './index.less';
import { db } from '../../services/firebase';

const { Column } = Table;

const UserManagement = () => {
  const history = useHistory();
  const usersCollection = db.collection('users');
  const [users, setUsers] = useState<UserData[]>([]);

  // const getUsers = async () => {
  //   // const usersSnapshot = await getDocs(usersCol);
  //   // const usersList = usersSnapshot.docs.map((doc) => doc.data());
  //   return usersList;
  // };

  // useEffect(() => {
  //   getUsers().then((items) => {
  //     setUsers(items);
  //   });
  // }, []);

  useEffect(() => {
    const unsubscribe = usersCollection.onSnapshot((items) => {
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

    return () => {
      unsubscribe();
    };
  }, []);

  console.log('users', users);

  return (
    <>
      <div className={styles.currentActiveUser}>
        <Divider className={styles.title} orientation="left">
          Current Active User
        </Divider>
        <Row gutter={16} className={styles.btnContainer}>
          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.btn}
              onClick={() => {
                history.push('/user-management/create');
              }}
            >
              <PlusOutlined /> Create new user
            </Button>
          </Col>
        </Row>
        <Table<UserData>
          dataSource={users}
          rowKey={(record) => record.id}
          pagination={false}
          bordered
          size="small"
          scroll={{ y: 500 }}
        >
          <Column title="No." key="rowNumber" dataIndex="rowNumber" align="center" width="10%" />
          <Column
            title="User Name"
            dataIndex="userName"
            key="userName"
            align="center"
            width="30%"
          />
          <Column title="Email" dataIndex="email" key="email" align="center" width="40%" />
          <Column
            title=""
            key="edit-action"
            width="20%"
            align="center"
            render={() => (
              <Space size="middle">
                <Button
                  onClick={() => {
                    // setIsOpenDrawer(true);
                    // setDeviceId(text.key);
                  }}
                >
                  <EditOutlined />
                </Button>
              </Space>
            )}
          />
        </Table>
      </div>
    </>
  );
};

export default UserManagement;
