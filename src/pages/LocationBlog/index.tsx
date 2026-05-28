import { LocationBlogList } from '@/api/server-data';
import { STATUS_COLORS, STATUS_DISPLAY } from '@/types/status.enum';
import { DeleteOutlined, EditOutlined, FileSearchOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Table, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import type { ColumnType } from 'antd/es/table/interface';
import React from 'react';
import LocationBlogCreate from './LocationBlogCreate/LocationBlogCreate';

interface IOpenMode {
    isEdit: boolean;
    id?: string | null;
    isOpen: boolean;
}
const LocationBlog = () => {
    const options = {
        timeZone: "Asia/Ho_Chi_Minh",
        day: "2-digit" as const,
        month: "2-digit" as const,
        year: "numeric" as const
    };
    const columns: ColumnType<any>[] = [
        {
            title: 'Mã bài viết',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            render: (text: string) => <p style={{ width: "80px" }}>{text}</p>,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
            render: (text: string) => <span className="block" style={{ width: "200px" }}>{text}</span>,

        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            render: (text: string) => <span className="block" style={{ width: "300px" }}>{text}</span>,

        },
        {
            title: 'Hình ảnh',
            dataIndex: 'photos',
            key: 'photos',
            render: (urls: string[]) => <span className="flex flex-row gap-2" style={{ width: "200px" }}>{urls.length > 0 ?
                urls.map((url) =>
                    <img key={url} src={url} alt="Image" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />) : 'No image'}
            </span>,

        },
        {
            title: 'Vị trí',
            dataIndex: 'position',
            key: 'position',
            render: (text: string) => <span className="block break-all" style={{ width: "200px" }}><a target="_blank" href={text} rel="noopener noreferrer">{text}</a></span>,

        },
        {
            title: 'Đường đi chính',
            dataIndex: 'road',
            key: 'road',
            render: (text: string) => <span className="block" style={{ width: "100px" }}>{text}</span>,

        },
        {
            title: 'Xuất phát',
            dataIndex: 'startingId',
            key: 'startingId',
            render: (text: string) => <span className="block break-all" style={{ width: "200px" }}><a target="_blank" href={text} rel="noopener noreferrer">{text}</a></span>,

        },
        {
            title: 'Kết thúc',
            dataIndex: 'destinationId',
            key: 'destinationId',
            render: (text: string) => <span className="block break-all" style={{ width: "200px" }}><a target="_blank" href={text} rel="noopener noreferrer">{text}</a></span>,

        },
        {
            title: 'Tags (Địa điểm đi qua)',
            dataIndex: 'locationTags',
            key: 'locationTags',
            render: (tags: string[]) => <span className="flex flex-row gap-1 flex-wrap" style={{ width: "200px" }}>{tags.length > 0 ? tags.map((tag) =>
                <Tag key={tag} color="#2db7f5" variant="outlined">
                    {tag}
                </Tag>
            ) : 'No tags'}
            </span>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            fixed: 'end',
            render: (s: number) => <Tag key={s} color={STATUS_COLORS[s]}>{STATUS_DISPLAY[s]}</Tag>,

        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (d: Date) => <span>{`${new Date(d).toLocaleString("vi-VN", options)}`}</span>,

        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (d: Date) => <span>{`${new Date(d).toLocaleString("vi-VN", options)}`}</span>,

        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: (text: string) => <a>{text}</a>,

        },
        {
            title: 'Người cập nhật',
            dataIndex: 'updatedBy',
            key: 'updatedBy',
            render: (text: string) => <a>{text}</a>,
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
                <Title level={2}>Danh sách bài viết</Title>
                <Button type="primary" onClick={() => setOpenMode({ ...openMode, isOpen: true, isEdit: false, id: null })}>
                    Tạo bài viết mới
                </Button>
            </div>
            <div className='flex flex-row gap-2 justify-between items-center mb-4'>
                <Space.Compact className="w-full">
                    <Space.Addon>
                        <SearchOutlined />
                    </Space.Addon>
                    <Input placeholder="Nhập từ khóa tiêu đề bài viết, địa điểm, tên đường..." />
                </Space.Compact>
                <div className='flex flex-row gap-2'>
                    <Select
                        // defaultValue="lucy"
                        style={{ width: 120 }}
                        allowClear
                        options={[{ value: '1', label: 'Sài Gòn' }, { value: '2', label: 'Đồng Nai' }]}
                        placeholder="Xuất phát"
                    />
                    <Select
                        // defaultValue="lucy"
                        style={{ width: 120 }}
                        allowClear
                        options={[{ value: '1', label: 'Vũng Tàu' }, { value: '2', label: 'Phan Thiết' }]}
                        placeholder="Kết thúc"
                    />
                    <Select
                        // defaultValue="lucy"
                        style={{ width: 120 }}
                        allowClear
                        options={[{ value: '1', label: 'Sài Gòn' }, { value: '2', label: 'Đồng Nai' }]}
                        placeholder="Trạng thái"
                    />
                    <Select
                        // defaultValue="lucy"
                        style={{ width: 120 }}
                        allowClear
                        options={[{ value: '1', label: 'Vũng Tàu' }, { value: '2', label: 'Phan Thiết' }]}
                        placeholder="Ngày tạo"
                    />
                </div>
            </div>
            <div>
                <Table columns={columns} dataSource={LocationBlogList} rowKey={(record) => record.id} scroll={{ x: 'max-content', y: 110 * 5 }} />
            </div>
            {openMode.isOpen && <LocationBlogCreate isEdit={openMode.isEdit} open={openMode.isOpen} setOpen={(open) => setOpenMode({ ...openMode, isOpen: open })} />}
        </div>
    )

}

export default LocationBlog