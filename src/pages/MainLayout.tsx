import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Space, theme } from 'antd';
import { LAYOUT_PAGE_DATA } from './mainLayout.config';
import { Link, Outlet, useNavigate } from 'react-router';
import UserInfoCard from '@/components/UserInfoCard/UserInfoCard';

const { Header, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="w-full h-auto px-4 py-2">
          <img className="w-32 h-auto" src="/PhuotDiLogo.png" alt="Logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ paddingTop: '16px' }}
        >{LAYOUT_PAGE_DATA.filter(data => data.isDisplay).map((data) => (
          <Menu.Item key={data.key} icon={React.createElement(data.icon)} style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={data.route} className="text-lg">{data.label}</Link>
          </Menu.Item>
        ))}</Menu>
      </Sider>
      <Layout style={{ display: 'flex', flexDirection: 'column' }}>
        <Header className="flex items-center justify-between" style={{ padding: 0, background: colorBgContainer, flexShrink: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Space className="flex-row items-center pr-4">
            <UserInfoCard
              id="1"
              name="Nguyễn Văn A"
              email="nguyenvana@example.com"
              avatarUrl="https://randomuser.me/api/portraits/men/1.jpg"
              onLogout={() => navigate('/login')}
              onClickAvatar={() => navigate('/profile/edit')} />
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
