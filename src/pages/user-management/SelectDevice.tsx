import {
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import type { ColumnDeviceManage, SelectDeviceData } from './index.interface';
import { DeviceManageCondition } from './index.interface';
import { useEffect } from 'react';
import { DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import styles from './SelectDevice.less';

interface Props {
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
}

const data: any = [
  {
    deviceId: '1',
    isAlert: false,
    isAdd: false,
  },
  {
    deviceId: '2',
    isAlert: false,
    isAdd: false,
  },
  {
    deviceId: '3',
    isAlert: false,
    isAdd: false,
  },
];

new Array(20).fill(undefined).forEach((item, index) => {
  data.push({
    deviceId: index + 4 + '',
    isAlert: false,
    isAdd: false,
  });
});

const SelectDevice = ({ isOpenDrawer, onCloseDrawer }: Props) => {
  const onFinish = (values: ColumnDeviceManage) => {
    console.log('values => ', JSON.stringify(values));
  };

  // useEffect(() => {
  //   if (deviceId) {
  //     form.setFieldsValue(initialValues);
  //   } else {
  //     clearValues();
  //   }
  // }, [deviceId]);

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
              dataSource={data}
              rowKey={(record) => record.id}
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
                render={(text) => {
                  return (
                    <Space size="middle">
                      <Checkbox
                        onChange={() => {
                          // onChangeOneTimeSubCoupon(record.key || '');
                        }}
                        checked={text.isAlert}
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
                render={(text) => {
                  return (
                    <Space size="middle">
                      <Checkbox
                        onChange={() => {
                          // onChangeOneTimeSubCoupon(record.key || '');
                        }}
                        checked={text.isAdd}
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
