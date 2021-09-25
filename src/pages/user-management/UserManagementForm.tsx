import { Button, Col, Divider, Form, Input, Row, Space } from 'antd';
import { Table } from 'antd';
import type { ColumnType } from './index.interface';
import type { FC } from 'react';
import { useState } from 'react';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ManageDevice from '../device-manager/ManageDevice';
import { useParams } from 'react-router-dom';
import styles from './UserManagementForm.less';

const UserManagementForm: FC = () => {
  const { id }: { id: string } = useParams();
  console.log('params', id);
  // const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  // const [deviceId, setDeviceId] = useState('');
  // const onCloseDrawer = () => {
  //   setIsOpenDrawer(false);
  // };
  const title = id ? 'Edit user' : 'Create new user';
  return (
    <>
      <div className={styles.manageCurrentActiveUser}>
        <Row gutter={16}>
          <Col span={24}>
            <Divider orientation="left">{title}</Divider>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserManagementForm;
