import { useState } from 'react';
import { Button, Col, Divider, Row, Space } from 'antd';
import { Table } from 'antd';
import type { ColumnType } from './index.interface';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styles from './index.less';

const { Column } = Table;

const data: ColumnType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

new Array(20).fill(undefined).forEach((item, index) => {
  data.push({
    key: index + 4 + '',
    firstName: 'Joe' + index,
    lastName: 'Black' + index,
    age: 32 + index,
    address: 'Sidney No. 1 Lake Park' + index,
    tags: ['cool', 'teacher'],
  });
});

const UserManagement = () => {
  const history = useHistory();
  const [, setIsOpenDrawer] = useState(false);
  const [, setDeviceId] = useState('');

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
        <Table<ColumnType>
          dataSource={data}
          rowKey={(record) => record.key}
          pagination={false}
          bordered
          size="small"
          scroll={{ y: 500 }}
        >
          <Column title="No." dataIndex="key" key="key" align="center" width="10%" />
          <Column
            title="User Name"
            dataIndex="firstName"
            key="firstName"
            align="center"
            width="30%"
          />
          <Column title="Email" dataIndex="lastName" key="lastName" align="center" width="40%" />
          <Column
            title=""
            key="edit-action"
            width="20%"
            align="center"
            render={(text) => (
              <Space size="middle">
                <Button
                  onClick={() => {
                    setIsOpenDrawer(true);
                    setDeviceId(text.key);
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
