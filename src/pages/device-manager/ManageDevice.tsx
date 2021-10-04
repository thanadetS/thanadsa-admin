import { Button, Col, Divider, Drawer, Form, Input, Row, Select, Space } from 'antd';
import type { ColumnDeviceManage } from './index.interface';
import { DeviceManageCondition } from './index.interface';
import { useEffect, useState } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import { getDeviceTypeDataFormatByDeviceId } from './utils';
import { getDeviceById, updateDevice } from '@/services/device-manager';
import { listUsers } from '@/services/user-management';
import { UserData } from '../user-management/index.interface';

interface Props {
  id: string | '';
  isRegister: boolean;
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
}

const ManageDevice = ({ id, isRegister, isOpenDrawer, onCloseDrawer }: Props) => {
  const [form] = Form.useForm();
  const [deviceId, setDeviceId] = useState('');
  const [users, setUsers] = useState<UserData[]>([]);

  const onFinish = (values: ColumnDeviceManage) => {
    updateDevice(id, {
      deviceId,
      deviceName: values.deviceName,
      isRegister: true,
    });
    console.log('values => ', JSON.stringify(values));
    onCloseDrawer();
  };

  const clearValues = () => {
    const deviceManage: ColumnDeviceManage = {
      alertList: [],
      customer: '',
      deviceId: '',
      deviceName: '',
    };
    form.setFieldsValue(deviceManage);
  };

  useEffect(() => {
    if (id) {
      getDeviceById(id).then((deviceItem) => {
        if (deviceItem) {
          setDeviceId(deviceItem.deviceId);
          form.setFieldsValue(deviceItem);
        }
      });
    }

    listUsers(setUsers);
    console.log('users', users);
    if (isRegister) {
      // form.setFieldsValue(deviceSelected(deviceId));
    } else {
      clearValues();
    }
  }, [isRegister, id]);

  const title = isRegister ? 'Manage device' : 'Register new device';

  return (
    <>
      <Drawer
        title={title}
        width={520}
        onClose={onCloseDrawer}
        visible={isOpenDrawer}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Device Id">{deviceId}</Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="deviceName"
                label="Device Name"
                required
                rules={[{ required: true, message: 'Please enter device name' }]}
              >
                <Input placeholder="Please enter  device name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="customer" label="Customer">
                <Select>
                  <Select.Option value="">{null}</Select.Option>
                  {users.map((item) => {
                    return <Select.Option value={item.userName}>{item.userName}</Select.Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider className="mt-0" />
          <Row gutter={16} className="mt-4">
            <Col span={24}>
              <Form.List name="alertList">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <Space key={field.key} align="baseline">
                        <Form.Item label="Device Id" style={{ width: 100 }}>
                          {deviceId}
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="Device"
                          name={[field.name, 'device']}
                          fieldKey={[field.fieldKey, 'device']}
                        >
                          <Select placeholder="Select..." style={{ width: 120 }}>
                            {(getDeviceTypeDataFormatByDeviceId(deviceId) || []).map((item) => (
                              <Select.Option value={item.value}>{item.label}</Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item label="Condition">
                          <Input.Group compact>
                            <Form.Item
                              {...field}
                              key={`conditionType${field.key}`}
                              name={[field.name, 'conditionType']}
                            >
                              <Select placeholder="Select..." style={{ width: 120 }}>
                                <Select.Option value={DeviceManageCondition.greaterThan}>
                                  Greater Than
                                </Select.Option>
                                <Select.Option value={DeviceManageCondition.lowerThan}>
                                  Lower Than
                                </Select.Option>
                                <Select.Option value={DeviceManageCondition.equal}>
                                  Equal
                                </Select.Option>
                              </Select>
                            </Form.Item>
                            <Form.Item {...field} name={[field.name, 'conditionValue']}>
                              <Input type="number" placeholder="value" style={{ width: 80 }} />
                            </Form.Item>
                          </Input.Group>
                        </Form.Item>
                        <MinusCircleOutlined
                          className={styles.icRemove}
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block>
                        Add Alert
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item className={styles.textRight}>
                <Button type="primary" htmlType="submit" className={styles.btn}>
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default ManageDevice;
