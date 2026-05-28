import { UserListData } from '@/api/server-data';
import { USER_STATUS_COLORS, USER_STATUS_DISPLAY } from '@/types/status.enum';
import { DeleteOutlined, EditOutlined, FileSearchOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space, Table, Tag } from 'antd'
import Title from 'antd/es/typography/Title'
import type { ColumnType } from 'antd/es/table/interface';
import React from 'react';
import UserInfoCard from '@/components/UserInfoCard/UserInfoCard';
import UserCreate from '../UserCreate/UserCreate';
// import LocationBlogCreate from './LocationBlogCreate/LocationBlogCreate';

interface IOpenMode {
    isEdit: boolean;
    id?: string | null;
    isOpen: boolean;
}
const Staff = () => {
    const options = {
        timeZone: "Asia/Ho_Chi_Minh",
        day: "2-digit" as const,
        month: "2-digit" as const,
        year: "numeric" as const
    };
    const columns: ColumnType<any>[] = [
        {
            title: 'Mã Nhân viên',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            render: (text: string) => <p style={{ width: "80px" }}>{text}</p>,
        },
        {
            title: 'Người dùng',
            key: 'userInfo',
            fixed: 'left',
            render: (_: any, record: any) => (
                <span className="block" style={{ width: "300px" }}>
                    <UserInfoCard
                        name={`${record.firstName} ${record.lastName}`}
                        userName={record.userName}
                        avatarUrl={record.avatarUrl}
                        email={record.email}
                    />
                </span>
            ),
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: (text: string) => <span className="block" style={{ width: "200px" }}>{text}</span>,

        },

        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (text: string) => <span className="block break-all" style={{ width: "200px" }}>{text}</span>,

        },
        {
            title: 'Nơi sinh sống',
            dataIndex: 'address',
            key: 'address',
            render: (text: string) => <span className="block" style={{ width: "200px" }}>{text}</span>,

        },
        // {
        //     title: 'Vai trò',
        //     dataIndex: 'role',
        //     key: 'role',
        //     render: (text: string) => <span className="block break-all" ><a target="_blank" href={text} rel="noopener noreferrer">{text}</a></span>,

        // },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (s: number) => <Tag key={s} color={USER_STATUS_COLORS[s]}>{USER_STATUS_DISPLAY[s]}</Tag>,

        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (d: Date) => <span>{`${new Date(d).toLocaleString("vi-VN", options)}`}</span>,

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
                <Title level={2}>Danh sách Nhân viên</Title>
                <Button type="primary" onClick={() => setOpenMode({ ...openMode, isOpen: true, isEdit: false, id: null })}>
                    Tạo Nhân viên mới
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
                        options={[{ value: '1', label: 'Vũng Tàu' }, { value: '2', label: 'Phan Thiết' }]}
                        placeholder="Vai trò"
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
                <Table columns={columns} dataSource={UserListData} scroll={{ x: 'max-content', y: 110 * 5 }} />
            </div>
            {openMode.isOpen && <UserCreate pageName="Nhân viên" isEdit={openMode.isEdit} open={openMode.isOpen} setOpen={(open) => setOpenMode({...openMode, isOpen: open})} />}
        </div>
    )

}

export default Staff