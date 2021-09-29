import { Button, Col, Divider, Form, Input, Row, Space, Table, Upload } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import { DeleteOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import styles from './UserManagementForm.less';
import type { UploadFile } from 'antd/lib/upload/interface';
import { storage } from '../../services/firebase';
import type { UserDeviceData } from './index.interface';
import Column from 'antd/lib/table/Column';
import SelectDevice from './SelectDevice';
import { beforeUpload, onPreview } from '../../services/user-management/upload';

const data: any = [
  {
    rowNumber: '1',
  },
  {
    rowNumber: '2',
  },
  {
    rowNumber: '3',
  },
];

new Array(20).fill(undefined).forEach((item, index) => {
  data.push({
    rowNumber: index + 4 + '',
  });
});

const UserManagementForm: FC = () => {
  const [form] = Form.useForm();
  const { id }: { id: string } = useParams();
  const [fileImages, setFileImages] = useState<UploadFile[]>([]);
  const [uploadFile, setUploadFile] = useState<any>();
  const [userDevices] = useState<UserDeviceData[]>(data);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  // setUserDevices(data);

  // const [fileImages, setFileImages] = useState<UploadFile[]>([
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  // ]);
  // console.log('params', id);
  // const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  // const [deviceId, setDeviceId] = useState('');
  // const onCloseDrawer = () => {
  //   setIsOpenDrawer(false);
  // };
  const title = id ? 'Edit user' : 'Create new user';

  // const onChangeImage = async ({ fileList: newFileList }: any) => {
  //   const storageRef = await storage.ref();
  //   console.log('newFileList', newFileList);
  //   const [file] = newFileList;
  //   const metadata = {
  //     contentType: file.type,
  //   };
  //   console.log('file', file);
  //   const uploadImage = storageRef
  //     .child(`admin/user-images/${new Date().getTime()}-${file.name}`)
  //     .put(file, metadata);
  //   console.log('uploadImage', uploadImage);

  //   // Register three observers:
  //   // 1. 'state_changed' observer, called any time the state changes
  //   // 2. Error observer, called on failure
  //   // 3. Completion observer, called on successful completion
  //   uploadImage.on(
  //     'state_changed',
  //     (snapshot) => {
  //       console.log('snapshot', snapshot);
  //       // // Observe state change events such as progress, pause, and resume
  //       // // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       // console.log('Upload is ' + progress + '% done');
  //       // switch (snapshot.state) {
  //       //   case FileUploadTaskState.PAUSED: // or 'paused'
  //       //     console.log('Upload is paused');
  //       //     break;
  //       //   case FileUploadTaskState.RUNNING: // or 'running'
  //       //     console.log('Upload is running');
  //       //     break;
  //       // }
  //     },
  //     (error) => {
  //       // Handle unsuccessful uploads
  //       console.log('error => ', error);
  //     },
  //     () => {
  //       // Handle successful uploads on complete
  //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //       uploadImage.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //         console.log('File available at', downloadURL);
  //       });
  //     },
  //   );

  //   setFileImages(newFileList);
  // };

  const onChangeImage = ({ fileList: newFileList }: any) => {
    setFileImages(newFileList);
  };

  const customUpload = async ({ onError, onSuccess, file }: any) => {
    const storageRef = await storage.ref();
    const metadata = {
      contentType: file.type,
    };

    const imageName = `${new Date().getTime()}-${file.name}`; //a unique name for the image
    const imgFile = storageRef.child(`admin/user-images/${imageName}`);
    try {
      const image = imgFile.put(file, metadata);
      image.pause();
      setUploadFile(image);
      onSuccess(null);
    } catch (e) {
      onError(e);
    }
  };

  const onFinish = (values: any) => {
    console.log('values', values);
    console.log('pass is admin => ', SHA256('admin').toString());
    uploadFile.resume();
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
              <Form.Item label="Profile Picture" name="image">
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
            <Button type="default" onClick={() => {}}>
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
