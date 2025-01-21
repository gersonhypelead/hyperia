import { Alert, Input, App } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { userCredential } from '../../auth/types/userTypes';
import { useLogin } from '../../hooks/useLogin';
import './style.css';
import config from '../../config'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { LoginAuthReducer } from '../../redux/actions/auth/Auth';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [notificacion, setNotificacion] = useState(false);
  const { data, error, doLogin } = useLogin();

  const handleLogin = async () => {

    const loginCred: userCredential = {
      usuario,
      contrasena,
    };

    const rpta: any = await dispatch(LoginAuthReducer(loginCred));

    if (rpta.respuesta) {
      notification.success({ message: rpta.mensaje });
      navigate('/home');
    } else {
      notification.error({ message: "Lo sentimos, el usuario o contraseña son incorrectas" });
    }
  };

  const loginGoogle = () => {
    window.location.href = `${config.API_URL}auth/google`;
  };

  return (
    <div className="container">
      <div className="left">
        <p>Bienvenido a </p>
        <h1>Hyperia</h1>
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
