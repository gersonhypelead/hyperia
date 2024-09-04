import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, CreditCardOutlined, LogoutOutlined } from '@ant-design/icons';
import './styled.css';

interface NavbarProps {
  colorBgContainer: string;
}

const Navbar: React.FC<NavbarProps> = ({ colorBgContainer }) => {
  const navigate = useNavigate();
  const { Header } = Layout;

  const handleLogout = () => {
    // localStorage.removeItem('token');
    localStorage.clear();
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate('/profile')}>
        <UserOutlined /> Ver Perfil
      </Menu.Item>
      <Menu.Item key="settings" onClick={() => navigate('/settings')}>
        <CreditCardOutlined /> Mi Suscripción
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Cerrar Sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: colorBgContainer }}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
        }}
      >
        <Dropdown
          overlay={menu}
          trigger={['click']}
        >
          <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
