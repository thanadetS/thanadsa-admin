import { Button, Divider, Space } from 'antd';
import { Table } from 'antd';
import type { ColumnType } from './index.interface';
import { useState } from 'react';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ManageDevice from './ManageDevice';
import listDevices from '../../services/device-manager/devices';
import styles from './index.less';
import { useEffect } from 'react';
import { getDeviceTypeByDeviceId } from './utils';

const { Column } = Table;

const DeviceManager = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [devices, setDevices] = useState<ColumnType[]>([]);
  const [isRegister, setIsRegister] = useState(false);

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  useEffect(() => {
    const list = (listDevices || []).map((item) => {
      return {
        deviceId: item.msgParam.deviceUid.toUpperCase(),
        deviceType: getDeviceTypeByDeviceId(item.msgParam.deviceUid) || '',
      };
    });
    setDevices(list);
  }, []);

  return (
    <>
      <div className={styles.deviceManager}>
        <div className={styles.listDevice}>
          <Divider orientation="left">Registered Device</Divider>
          <Table<ColumnType>
            dataSource={devices}
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
              render={(text) => (
                <Space size="middle">
                  <Button
                    onClick={() => {
                      setIsOpenDrawer(true);
                      setDeviceId(text.deviceId);
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
          <Table<ColumnType>
            dataSource={devices}
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
              render={(text) => (
                <Space size="middle">
                  <Button
                    onClick={() => {
                      setIsOpenDrawer(true);
                      setDeviceId(text.deviceId);
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
        deviceId={deviceId}
        isOpenDrawer={isOpenDrawer}
        onCloseDrawer={onCloseDrawer}
      />
    </>
  );
};

export default DeviceManager;
