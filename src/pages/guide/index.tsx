import { Form, Input, Button, Checkbox, Upload, Modal, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { useState } from 'react';
import { ValidateStatus } from 'antd/lib/form/FormItem';

interface FileValidation {
  validateStatus?: ValidateStatus;
  errorMsg: string;
}
interface PreviewImage {
  previewVisible?: boolean;
  previewImage?: string;
}
const GuidePge: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewData, setPreviewData] = useState<PreviewImage>({});
  const [fileValidation, setFileValidation] = useState<FileValidation>({ errorMsg: '' });
  const onFinish = (values: unknown) => {
    validateFile();
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    validateFile();
    console.log('Failed:', errorInfo);
  };
  const validateFile = () => {
    setFileValidation({ validateStatus: 'success', errorMsg: '' });
    if (fileList.length === 0) {
      setFileValidation({ validateStatus: 'error', errorMsg: 'Please input image!' });
    }
  };
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewData({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleCancel = () => setPreviewData({});
  const handleChangeImage = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
    setTimeout(() => validateFile, 10);
  };
  const dummyRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  return (
    <Card>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label="File"
          name="fileList"
          validateStatus={fileValidation.validateStatus}
          help={fileValidation.errorMsg}
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Upload
            action={''}
            name={'fileList'}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChangeImage}
            customRequest={dummyRequest}>
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal visible={previewData.previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewData.previewImage} />
          </Modal>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your file name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="External Link"
          name="link"
          rules={[{ type: 'url', message: 'Please input correct link!' }]}>
          <div>We need you enter this if have</div>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default GuidePge;
