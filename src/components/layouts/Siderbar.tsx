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
  UsergroupAddOutlined,
  ScheduleOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import FloatMessage from '../floatMessage/FloatMessage';
import { useSelector } from 'react-redux';

const { Content, Footer, Sider } = Layout;

interface LayoutProps {
  children: ReactNode;
}

const Sidebar: React.FC<LayoutProps> = ({ children }) => {

  const {
    rex_user_auth
  } = useSelector(({ auth }: any) => auth);

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    { key: "1", label: <Link to={'/home'}>Home</Link>, icon: React.createElement(HomeOutlined), path: '/home', slug: 'show.module.home' },
    { key: "2", label: <Link to={'/crear-chatbot'}>Crear ChatBot</Link>, icon: React.createElement(HomeOutlined), path: '/crear-chatbot', slug: 'show.module.create-bots' },
    { key: "4", label: <Link to={'/chats'}>Chats</Link>, icon: React.createElement(WechatWorkOutlined), path: '/chats', slug: 'show.module.chats' },
    { key: "12", label: <Link to={'/analytics'}>Analytics</Link>, icon: React.createElement(BarChartOutlined), path: '/analytics', slug: 'show.module.analytics' },
    { key: "5", label: <Link to={'/administrador'}>Administrador</Link>, icon: React.createElement(WechatOutlined), path: '/administrador', slug: 'show.module.adm-bots' },
    { key: "6", label: <Link to={'/nuestros-chats'}>Nuestros Chats</Link>, icon: React.createElement(RobotOutlined), path: '/nuestros-chats', slug: 'show.module.marketplace-bots' },
    { key: "7", label: <Link to={'/precios'}>Precios</Link>, icon: React.createElement(DollarOutlined), path: '/precios', slug: 'show.module.pricing' },
    { key: "8", label: <Link to={'/usuarios'}>Usuarios</Link>, icon: React.createElement(TeamOutlined), path: '/usuarios', slug: 'show.module.adm-users' },
    { key: "9", label: <Link to={'/tipos-usuarios'}>Tipos de Usuarios</Link>, icon: React.createElement(UsergroupAddOutlined), path: '/tipos-usuarios', slug: 'show.module.adm-typeusers' },
    { key: "10", label: <Link to={'/planes'}>Planes </Link>, icon: React.createElement(ScheduleOutlined), path: '/planes', slug: 'show.module.adm-plans' },
    { key: "11", label: <Link to={'/paquetes-mensajes'}>Paquetes de Mensajes </Link>, icon: React.createElement(ScheduleOutlined), path: '/paquetes-mensajes', slug: 'show.module.adm-plans' },
    { key: "13", label: <Link to={'/prueba'}>Prueba</Link>, icon: React.createElement(ScheduleOutlined), path: '/prueba', slug: 'show.module.adm-plans' },
    // { label: 'Chats V2', icon: WechatWorkOutlined, path: '/chatsv2' },
  ]
    .filter(item => rex_user_auth.permisos.some((permiso: any) => permiso.slug === item.slug));
  // .map(({ key, label, icon: Icon, path }) => ({
  //   key,
  //   label: <Link to={path}>{label}</Link>,
  //   icon: <Icon />
  // }));

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
          <span>{rex_user_auth?.personas?.nombre + " " + rex_user_auth?.personas?.apellido_paterno}</span>
        </div>
        <Menu
          theme="light"
          mode="inline"
          // defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
      <Layout>
        <Navbar colorBgContainer={"white"} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            // background: colorBgContainer,
            borderRadius: 'borderRadiusLG',
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()}
        </Footer>
        <FloatMessage supportChat={true} />
      </Layout>
    </Layout>
  );
};

export default Sidebar;
