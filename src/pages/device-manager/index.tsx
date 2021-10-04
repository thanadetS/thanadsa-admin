import { Button, Divider, Space } from 'antd';
import { Table } from 'antd';
import type { DeviceInfo } from './index.interface';
import { useState } from 'react';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ManageDevice from './ManageDevice';
// import listDevices from '../../services/device-manager/devices';
import styles from './index.less';
import { useEffect } from 'react';
import { listDevices } from '@/services/device-manager';

const { Column } = Table;

const DeviceManager = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [recordId, setRecordId] = useState('');
  const [registerDevices, setRegisterDevices] = useState<DeviceInfo[]>([]);
  const [unregisterDevices, setUnregisterDevices] = useState<DeviceInfo[]>([]);
  const [isRegister, setIsRegister] = useState(false);

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  useEffect(() => {
    listDevices(setRegisterDevices, true);
    listDevices(setUnregisterDevices, false);
  }, []);

  return (
    <>
      <div className={styles.deviceManager}>
        <div className={styles.listDevice}>
          <Divider orientation="left">Registered Device</Divider>
          <Table<DeviceInfo>
            dataSource={registerDevices}
            rowKey={(record) => record.deviceId}
            // height="92%"
            pagination={false}
            bordered
            size="small"
            scroll={{ y: 500 }}
          >
            <Column
              title="Device Id"
              dataIndex="deviceId"
              key="deviceId"
              align="center"
              width="30%"
            />
            <Column
              title="Device Type"
              dataIndex="deviceType"
              key="deviceType"
              align="center"
              width="50%"
            />
            <Column
              key="edit-action"
              width="20%"
              align="center"
              render={(_text, record: DeviceInfo) => (
                <Space size="middle">
                  <Button
                    onClick={() => {
                      setIsOpenDrawer(true);
                      setRecordId(record.id || '');
                      setIsRegister(true);
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
          <Table<DeviceInfo>
            dataSource={unregisterDevices}
            rowKey={(record) => record.deviceId}
            // height="92%"
            pagination={false}
            bordered
            size="small"
            scroll={{ y: 500 }}
          >
            <Column
              title="Device Id"
              dataIndex="deviceId"
              key="deviceId"
              align="center"
              width="30%"
            />
            <Column
              title="Device Type"
              dataIndex="deviceType"
              key="deviceType"
              align="center"
              width="50%"
            />
            <Column
              key="add-action"
              width="20%"
              align="center"
              render={(_text, record: DeviceInfo) => (
                <Space size="middle">
                  <Button
                    onClick={() => {
                      setIsOpenDrawer(true);
                      setRecordId(record.id || '');
                      setIsRegister(false);
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
      <ManageDevice
        isRegister={isRegister}
        id={recordId}
        isOpenDrawer={isOpenDrawer}
        onCloseDrawer={onCloseDrawer}
      />
    </>
  );
};

export default DeviceManager;
