import { useEffect, useState } from 'react';
import { Button, Col, Divider, Row, Space } from 'antd';
import { Table } from 'antd';
import type { UserData } from './index.interface';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import { history } from 'umi';
import { listUsers } from '@/services/user-management';

const { Column } = Table;

const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const unsubscribe = listUsers(setUsers);
    return () => {
      unsubscribe();
    };
  }, []);

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
            render={(record) => (
              <Space size="middle">
                <Button
                  onClick={() => {
                    history.push(`/user-management/edit/${record.id}`);
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
