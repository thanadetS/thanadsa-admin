import { Button, Col, Divider, Form, Input, Row, Space, Table, Upload } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { DeleteOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import styles from './UserManagementForm.less';
import type { UserData, UserDeviceData } from './index.interface';
import Column from 'antd/lib/table/Column';
import SelectDevice from './SelectDevice';
import { beforeUpload, onPreview, customUpload } from '../../services/user-management/upload';
import { history } from 'umi';
import { createNewUser, getUserById, updateUser } from '@/services/user-management';

const UserManagementForm: FC = () => {
  // should be moved to .env or variable config in pipeline
  const sKey = 'thanadsa-admin';

  const [form] = Form.useForm();
  const { id }: { id: string } = useParams();
  const [fileImages, setFileImages] = useState<any>([]);
  const [userDevices] = useState<UserDeviceData[]>([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  useEffect(() => {
    getUserById(id).then((userInfo) => {
      if (userInfo) {
        const password = CryptoJS.AES.decrypt(userInfo.password, sKey);
        userInfo.password = password.toString(CryptoJS.enc.Utf8);
        setFileImages([
          {
            url: userInfo.userImage || '',
          },
        ]);
        form.setFieldsValue(userInfo);
      }
    });
  }, [id]);

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const title = id ? 'Edit user' : 'Create new user';

  const onChangeImage = ({ fileList: newFileList }: any) => {
    console.log('newFileList', newFileList);
    setFileImages(newFileList);
  };

  const onFinish = async (values: any) => {
    const password = CryptoJS.AES.encrypt(values.password, sKey).toString();
    const userObj: UserData = {
      userName: values.userName,
      password,
      email: values.email,
      userImage: values.userImage || '',
    };

    if (values.userImage.file) {
      userObj.userImage = values.userImage.file.imageUrl;
    }

    if (id) {
      await updateUser(id, userObj);
    } else {
      await createNewUser(userObj);
    }
    history.push('/user-management');
  };

  return (
    <>
      <div className={styles.manageCurrentActiveUser}>
        <Row gutter={16}>
          <Col span={24}>
            <Divider orientation="left">{title}</Divider>
            <Form
              form={form}
              name="formUserDevices"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password autoComplete="new-password" />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Profile Picture" name="userImage">
                <Upload
                  listType="picture-card"
                  fileList={fileImages}
                  onChange={onChangeImage}
                  customRequest={customUpload}
                  beforeUpload={beforeUpload}
                  onPreview={onPreview}
                >
                  {fileImages.length < 1 && '+ Upload'}
                </Upload>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Table<UserDeviceData>
              dataSource={userDevices}
              rowKey={(record) => record.id}
              pagination={false}
              bordered
              size="small"
              scroll={{ y: 180 }}
            >
              <Column
                title="No."
                key="rowNumber"
                dataIndex="rowNumber"
                align="center"
                width="10%"
              />
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
              <Column title="Alert" dataIndex="isAlert" key="isAlert" align="center" width="20%" />
              <Column
                title=""
                key="delete-action"
                width="10%"
                align="center"
                render={() => (
                  <Space size="middle">
                    <Button
                      onClick={() => {
                        // setIsOpenDrawer(true);
                        // setDeviceId(text.key);
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={3}>
            <Button
              type="link"
              onClick={() => {
                setIsOpenDrawer(true);
              }}
            >
              + Add Device
            </Button>
          </Col>
          <Col offset={15} span={3} className={styles.textRight}>
            <Button
              type="primary"
              onClick={() => {
                form.submit();
              }}
            >
              Submit
            </Button>
          </Col>
          <Col span={3} className={styles.textRight}>
            <Button
              type="default"
              onClick={() => {
                history.push('/user-management');
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
        <SelectDevice isOpenDrawer={isOpenDrawer} onCloseDrawer={onCloseDrawer} />
      </div>
    </>
  );
};

export default UserManagementForm;
