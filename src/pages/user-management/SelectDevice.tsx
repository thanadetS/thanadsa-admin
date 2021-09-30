import { Button, Checkbox, Col, Drawer, Row, Space, Table } from 'antd';
import type { SelectDeviceData, UserDeviceData } from './index.interface';
import Column from 'antd/lib/table/Column';
import styles from './SelectDevice.less';
import { getDeviceTypeByDeviceId } from '../device-manager/utils';
import listDevices from '../../services/device-manager/devices';
import { useEffect, useState } from 'react';

interface Props {
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
}

const SelectDevice = ({ isOpenDrawer, onCloseDrawer }: Props) => {
  const [devices, setDevices] = useState<SelectDeviceData[]>([]);

  useEffect(() => {
    const list = (listDevices || []).map((item) => {
      return {
        deviceId: item.msgParam.deviceUid.toUpperCase(),
        deviceType: getDeviceTypeByDeviceId(item.msgParam.deviceUid) || '',
        isAlert: false,
        isAdd: false,
      };
    });
    setDevices(list);
  }, []);

  const onChangeIsAlert = (deviceId: string) => {
    const items = devices.map((item) =>
      item.deviceId === deviceId ? { ...item, isAlert: !item.isAlert } : item,
    );
    setDevices(items);
  };

  const onChangeIsAdd = (deviceId: string) => {
    const items = devices.map((item) =>
      item.deviceId === deviceId ? { ...item, isAdd: !item.isAdd } : item,
    );
    setDevices(items);
  };

  return (
    <>
      <Drawer
        title="Select Device"
        width={520}
        onClose={onCloseDrawer}
        visible={isOpenDrawer}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Table<SelectDeviceData>
              dataSource={devices}
              rowKey={(record) => record.deviceId}
              pagination={false}
              bordered
              size="small"
              scroll={{ y: 300 }}
            >
              <Column
                title="Device Id"
                dataIndex="deviceId"
                key="deviceId"
                align="center"
                width="30%"
              />
              <Column
                title="Type"
                dataIndex="deviceType"
                key="deviceType"
                align="center"
                width="30%"
              />
              <Column
                title="Alert"
                dataIndex="isAlert"
                key="isAlert"
                align="center"
                width="20%"
                render={(_text, record: SelectDeviceData) => {
                  return (
                    <Space size="middle">
                      <Checkbox
                        onChange={() => {
                          onChangeIsAlert(record.deviceId || '');
                        }}
                        checked={record.isAlert}
                      />
                    </Space>
                  );
                }}
              />
              <Column
                title="Add"
                dataIndex="isAdd"
                key="isAdd"
                align="center"
                width="20%"
                render={(_text, record: SelectDeviceData) => {
                  return (
                    <Space size="middle">
                      <Checkbox
                        onChange={() => {
                          onChangeIsAdd(record.deviceId || '');
                        }}
                        checked={record.isAdd}
                      />
                    </Space>
                  );
                }}
              />
            </Table>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col offset={10} span={7} className={styles.textRight}>
            <Button type="primary" onClick={() => {}}>
              Submit
            </Button>
          </Col>
          <Col span={7} className={styles.textRight}>
            <Button type="default" onClick={onCloseDrawer}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default SelectDevice;
