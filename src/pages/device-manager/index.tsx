import { Button, Divider, Space } from 'antd';
import { Table } from 'antd';
import type { ColumnType } from './index.interface';
import { useState } from 'react';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ManageDevice from './ManageDevice';
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

const DeviceManager = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [deviceId, setDeviceId] = useState('');

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  return (
    <>
      <div className={styles.deviceManager}>
        <div className={styles.listDevice}>
          <Divider orientation="left">Registered Device</Divider>
          <Table<ColumnType>
            dataSource={data}
            rowKey={(record) => record.key}
            // height="92%"
            pagination={false}
            bordered
            size="small"
            scroll={{ y: 500 }}
          >
            <Column
              title="Device Id"
              dataIndex="firstName"
              key="firstName"
              align="center"
              width="30%"
            />
            <Column
              title="Device Type"
              dataIndex="lastName"
              key="lastName"
              align="center"
              width="50%"
            />
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
        <div className={styles.listDevice}>
          <Divider orientation="left">Unregistered Device</Divider>
          <Table<ColumnType>
            dataSource={data}
            rowKey={(record) => record.key}
            // height="92%"
            pagination={false}
            bordered
            size="small"
            scroll={{ y: 500 }}
          >
            <Column
              title="Device Id"
              dataIndex="firstName"
              key="firstName"
              align="center"
              width="30%"
            />
            <Column
              title="Device Type"
              dataIndex="lastName"
              key="lastName"
              align="center"
              width="50%"
            />
            <Column
              title=""
              key="edit-action"
              width="20%"
              align="center"
              render={() => (
                <Space size="middle">
                  <Button
                    onClick={() => {
                      setIsOpenDrawer(true);
                      setDeviceId('');
                    }}
                  >
                    <PlusCircleOutlined />
                  </Button>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
      <ManageDevice deviceId={deviceId} isOpenDrawer={isOpenDrawer} onCloseDrawer={onCloseDrawer} />
    </>
  );
};

export default DeviceManager;
