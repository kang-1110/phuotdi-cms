import { LocationBlogList } from '@/api/server-data';
import { Table } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
const columns = [
    {
        title: 'Mã bài viết',
        dataIndex: 'id',
        key: 'id',
        render: (text: string) => <p>{text}</p>,
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
        render: (text: string) => <p>{text}</p>,

    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content', 
        render: (text: string) => <span>{text}</span>,

    },
    {
        title: 'Hình ảnh',
        dataIndex: 'photos',
        key: 'photos', render: (text: string) => <a>{text}</a>,

    },
    {
        title: 'Vị trí',
        dataIndex: 'position',
        key: 'position', render: (text: string) => <a>{text}</a>,

    },
    {
        title: 'Đường đi chính',
        dataIndex: 'road',
        key: 'road', render: (text: string) => <a>{text}</a>,

    },
    {
        title: 'Xuất phát',
        dataIndex: 'startingId',
        key: 'startingId', render: (text: string) => <a>{text}</a>,

    },
    {
        title: 'Kết thúc',
        dataIndex: 'destinationId',
        key: 'destinationId', render: (text: string) => <a>{text}</a>,

    },
    {
        title: 'Tags (Địa điểm đi qua)',
        dataIndex: 'locationTags',
        key: 'locationTags', render: (text: string) => <a>{text}</a>,

    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status', render: (text: string) => <a>{text}</a>,

    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt', render: (text: string) => <a>{text}</a>,

    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'updatedAt',
        key: 'updatedAt', render: (text: string) => <a>{text}</a>,

    },
    {
        title: 'Người tạo',
        dataIndex: 'createdBy',
        key: 'createdBy', render: (text: string) => <a>{text}</a>,

    },
    {
        title: 'Người cập nhật',
        dataIndex: 'updatedBy',
        key: 'updatedBy', render: (text: string) => <a>{text}</a>,

    }
];
const LocationBlog = () => {
    return (
        <div>
            <div>
                <Title level={2}>Danh sách bài viết</Title>
            </div>
            <div className='filter'></div>
            <div>
                <Table columns={columns} dataSource={LocationBlogList} />
            </div>
        </div>
    )
}

export default LocationBlog