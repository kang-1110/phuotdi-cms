import React, {
    useEffect,
    useState,
} from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Upload, Image } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface IProps {
    isEdit?: boolean;
    open?: boolean;
    setOpen?: (open: boolean) => void;
    pageName: string;
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const UserCreate: React.FC<IProps> = ({ isEdit = false, open, setOpen = () => { }, pageName }: IProps) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-xxx',
            percent: 50,
            name: 'image.png',
            status: 'uploading',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-5',
            name: 'image.png',
            status: 'error',
        },
    ]);
    useEffect(() => {
        console.log("Mounted")
        return () => {
            console.log("Unmounted")
        }
    }, [])
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    const onClose = () => {
        setOpen(false);
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <>
            <Drawer
                title={`${!isEdit ? "Tạo" : "Cập nhật"} ${pageName}`}
                closable={{ placement: 'end' }}
                size={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                footer={
                    <Space className="w-full flex-row justify-end">
                        <Button onClick={onClose} type="primary">
                            Lưu
                        </Button>
                        <Button onClick={onClose}>Hủy</Button>
                    </Space>
                }
                loading={false}
            >
                <Form layout="vertical" requiredMark={false}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="userName"
                                label="Avatar"
                            >
                                <Upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture-circle"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                                {previewImage && (
                                    <Image
                                        styles={{ root: { display: 'none' } }}
                                        preview={{
                                            open: previewOpen,
                                            onOpenChange: (visible) => setPreviewOpen(visible),
                                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                        }}
                                        src={previewImage}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="userName"
                                label="Tên đăng nhập"
                                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                            >
                                <Input placeholder="Vui lòng nhập tên đăng nhập" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                                label="Tên"
                                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                            >
                                <Input placeholder="Vui lòng nhập tên" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="lastName"
                                label="Họ"
                                rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                            >
                                <Input placeholder="Vui lòng nhập họ" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                            >
                                <Input placeholder="Vui lòng nhập email" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                            >
                                <Input placeholder="Vui lòng nhập số điện thoại" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="birthday"
                                label="Ngày sinh"
                                rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}
                            >
                                <Input placeholder="Vui lòng nhập ngày sinh" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                            >
                                <Input placeholder="Vui lòng nhập địa chỉ" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="status"
                                label="Trạng thái"
                                rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                            >
                                <Select
                                    placeholder="Vui lòng chọn trạng thái"
                                    options={[
                                        { label: 'Jack Ma', value: 'jack' },
                                        { label: 'Tom Liu', value: 'tom' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="role"
                                label="Vai trò"
                                rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
                            >
                                <Select
                                    placeholder="Vui lòng chọn vai trò"
                                    options={[
                                        { label: 'Jack Ma', value: 'jack' },
                                        { label: 'Tom Liu', value: 'tom' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default UserCreate;