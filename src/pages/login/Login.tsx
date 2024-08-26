import { Alert, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { userCredential } from '../../auth/types/userTypes';
import { useLogin } from '../../hooks/useLogin';
import './style.css';

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [notificacion, setNotificacion] = useState(false);
  const { data, error, doLogin } = useLogin();

  const handleLogin = async () => {
    const loginCred: userCredential = {
      usuario,
      contrasena,
    };
    try {
      const login = await doLogin(loginCred);
      console.log("login: ----------");
      console.log(login);

      navigate('/');
    } catch (e) {
      setNotificacion(true)
      // alert('error al loguearte: ' + error);
      // messageApi.info(
      //   'Lo sentimos, el usuario o contraseña son incorrectas.',
      // );
    }
  };

  const loginGoogle = () => {
    window.location.href = 'http://localhost:3005/auth/google';
  };

  return (
    <div className="container">
      <div className="left">
        <h1>Bienvenido a Hyperia</h1>
      </div>
      <div className="right">
        {
          notificacion ? (
            <div
              style={{
                width: '100%'
              }}
            >
              <Alert
                message="Credenciales Incorrectas"
                description="Lo sentimos, el usuario o contraseña son incorrectas."
                type="error"
                showIcon
              />
            </div>
          ) : null
        }
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ color: '#03a9f4' }}>Iniciar Sesión</h1>
          <Link
            style={{ color: '#03a9f4', textDecoration: 'none' }}
            to={'/register'}
          >
            <ArrowRightOutlined /> Crear una nueva cuenta
          </Link>
        </div>
        <div className="input_box">
          <Input
            placeholder="Usuario"
            style={{ height: '50px' }}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <Input
            placeholder="Contraseña"
            style={{ height: '50px' }}
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <div className="btn_box">
          <button className="login_btn" onClick={handleLogin}>
            CONTINUAR <ArrowRightOutlined />
          </button>
        </div>
        <div className="btn_box">
          <button className="login_btn" onClick={loginGoogle}>
            con Google <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
