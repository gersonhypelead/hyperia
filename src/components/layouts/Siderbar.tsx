import React, { ReactNode, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  WechatWorkOutlined,
  WechatOutlined,
  RobotOutlined,
  DollarOutlined,
  TeamOutlined,
  UsergroupAddOutlined 
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import FloatMessage from '../floatMessage/FloatMessage';

const { Content, Footer, Sider } = Layout;

const items = [
  { label: 'Home', icon: HomeOutlined, path: '/home' },
  { label: 'Chats', icon: WechatWorkOutlined, path: '/chats' },
  { label: 'Administrador', icon: WechatOutlined, path: '/administrador' },
  { label: 'Nuestros Chats', icon: RobotOutlined, path: '/nuestros-chats' },
  { label: 'Precios', icon: DollarOutlined, path: '/precios' },
  { label: 'Usuarios', icon: TeamOutlined, path: '/usuarios' },
  { label: 'Tipos de Usuarios', icon: UsergroupAddOutlined, path: '/tipos-usuarios' },
  
].map((item, index) => ({
  key: String(index + 1),
  icon: React.createElement(item.icon),
  label: <Link to={item.path}>{item.label}</Link>,
  path: item.path,
}));

interface LayoutProps {
  children: ReactNode;
}

const Sidebar: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            marginLeft: '15px',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 40,
              height: 40,
              borderRadius: '100%',
            }}
          />
        </div>
        <div className="demo-logo-vertical" />
        <div
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            marginTop: '40px',
          }}
        >
          <Avatar size={30} icon={<UserOutlined />} /> <br />
          <span>Usuario Prueba</span>
        </div>
        <Menu
          theme="light"
          mode="inline"
          // defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
      <Layout>
        <Navbar colorBgContainer={colorBgContainer} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()}
        </Footer>
        <FloatMessage />
      </Layout>
    </Layout>
  );
};

export default Sidebar;
