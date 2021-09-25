import { Button, Col, Divider, Drawer, Form, Input, Row, Select, Space } from 'antd';
import type { ColumnDeviceManage } from './index.interface';
import { DeviceManageCondition } from './index.interface';
import { useEffect } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

interface Props {
  deviceId: string;
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
}

const ManageDevice = ({ deviceId, isOpenDrawer, onCloseDrawer }: Props) => {
  const [form] = Form.useForm();
  const initialValues = JSON.parse(
    '{"deviceName":"test","customer":"demo","alertList":[{"device":"greater-than","conditionChoice":"lower-than","conditionValue":"25"},{"device":"equal","conditionChoice":"equal","conditionValue":"54"},{"device":"lower-than","conditionChoice":"greater-than","conditionValue":"100"}]}',
  );

  const onFinish = (values: ColumnDeviceManage) => {
    console.log('values => ', JSON.stringify(values));
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
    if (deviceId) {
      form.setFieldsValue(initialValues);
    } else {
      clearValues();
    }
  }, [deviceId]);

  const title = deviceId ? 'Manage device' : 'Register new device';

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
                  <Select.Option value="demo">Demo</Select.Option>
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
                          1234567890
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="Device"
                          name={[field.name, 'device']}
                          fieldKey={[field.fieldKey, 'device']}
                        >
                          <Select placeholder="Select..." style={{ width: 120 }}>
                            <Select.Option value="greater-than">
                              Greater Than Greater Than
                            </Select.Option>
                            <Select.Option value="lower-than">Lower Than Lower Than</Select.Option>
                            <Select.Option value="equal">Equal Equal Equal</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item label="Condition">
                          <Input.Group compact>
                            <Form.Item
                              {...field}
                              key={`conditionChoice${field.key}`}
                              name={[field.name, 'conditionChoice']}
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
