import { LocationList } from '@/api/server-data';
import { DeleteOutlined, EditOutlined, FileSearchOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Table, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import type { ColumnType } from 'antd/es/table/interface';
import React from 'react';
import LocationCreate from './LocationCreate/LocationCreate';

interface IOpenMode {
    isEdit: boolean;
    id?: string | null;
    isOpen: boolean;
}
const Location = () => {

    const columns: ColumnType<any>[] = [
        {
            title: 'Mã địa điểm',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            render: (text: string) => <p style={{ width: "80px" }}>{text}</p>,
        },
        {
            title: 'Tên địa điểm',
            dataIndex: 'locationName',
            key: 'locationName',
            fixed: 'left',
            render: (text: string) => <span className="block" style={{ width: "200px" }}>{text}</span>,

        },
        {
            title: 'Thuộc',
            dataIndex: 'parentName',
            key: 'parentName',
            render: (text: string) => <span className="block" style={{ width: "300px" }}>{text}</span>,

        },
        {
            title: 'Hình ảnh',
            dataIndex: 'photo',
            key: 'photo',
            render: (url: string) => <span className="flex flex-row gap-2" style={{ width: "100px" }}>{url ? 
            <img src={url} alt="Image" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /> : 'No image'}
            </span>,

        },
        {
            title: 'Vị trí',
            dataIndex: 'position',
            key: 'position',
            render: (text: string) => <span className="block break-all" style={{ width: "200px" }}><a target="_blank" href={text} rel="noopener noreferrer">{text}</a></span>,

        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            render: (tag: string) => <span className="flex flex-row gap-1 flex-wrap" style={{ width: "200px" }}>
                {tag ? <Tag key={tag} color="#2db7f5" variant="outlined">
                    {tag}
                </Tag> : '--'}
            </span>

        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            fixed: 'end',
            render: (item) =>
                <span className="flex items-center gap-2">
                    <Button variant="solid" color="geekblue" shape="circle" icon={<FileSearchOutlined />} />
                    <Button variant="solid" color="orange" shape="circle" icon={<EditOutlined />} onClick={() => setOpenMode({ ...openMode, isOpen: true, isEdit: true, id: item })} />
                    <Button variant="solid" color="red" shape="circle" icon={<DeleteOutlined />} />
                </span>,
        }
    ];
    const [openMode, setOpenMode] = React.useState<IOpenMode>({
        isEdit: false,
        id: null,
        isOpen: false
    });

    return (
        <div>
            <div className='w-full flex flex-row justify-between items-center mb-4'>
                <Title level={2}>Danh sách Địa điểm</Title>
                <Button type="primary" onClick={() => setOpenMode({ ...openMode, isOpen: true, isEdit: false, id: null })}>
                    Tạo Địa điểm mới
                </Button>
            </div>
            <div className='flex flex-row gap-2 justify-between items-center mb-4'>
                <Space.Compact className="w-full">
                    <Space.Addon>
                        <SearchOutlined />
                    </Space.Addon>
                    <Input placeholder="Nhập từ khóa tiêu đề Địa điểm, địa điểm, tên đường..." />
                </Space.Compact>
                <div className='flex flex-row gap-2'>
                    <Select
                        // defaultValue="lucy"
                        style={{ width: 120 }}
                        allowClear
                        options={[{ value: '1', label: 'Sài Gòn' }, { value: '2', label: 'Đồng Nai' }]}
                        placeholder="Địa điểm"
                    />
                </div>
            </div>
            <div>
                <Table columns={columns} dataSource={LocationList} rowKey={(record) => record.id} scroll={{ x: 'max-content', y: 110 * 5 }} />
            </div>
            {openMode.isOpen && <LocationCreate isEdit={openMode.isEdit} open={openMode.isOpen} setOpen={(open) => setOpenMode({ ...openMode, isOpen: open })} />}
        </div>
    )

}

export default Location