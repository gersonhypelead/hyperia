import './style.css';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRegister } from '../../hooks/useRegister';
import { userRegister } from '../../auth/types/userTypes';

const Register = () => {
  const navigate = useNavigate();
  /* datos usuario */
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const { error, OptRegister } = useRegister();

  const handleRegister = async () => {
    const registerData: userRegister = {
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      usuario,
      contrasena,
      tipo_usuario_id: 1,
    };
    await OptRegister(registerData);
    if (error) {
      alert('error al registrar: ' + error);
    } else {
      navigate('/');
    }
  };
  return (
    <div className="container">
      <div className="left">
        <h1>Hola, mucho gusto</h1>
        <h3>Simplemente regístrate para unirte a nosotros</h3>
      </div>
      <div className="right">
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ color: '#03a9f4' }}>Registro</h1>
          <Link
            style={{ color: '#03a9f4', textDecoration: 'none' }}
            to={'/login'}
          >
            <ArrowRightOutlined /> ¿Ya tienes una cuenta?
          </Link>
        </div>

        <div className="input_box">
          <Input
            placeholder="Nombre de usuario"
            style={{ height: '50px' }}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            placeholder="Apellido paterno"
            style={{ height: '50px' }}
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />
          <Input
            placeholder="Apellido materno"
            style={{ height: '50px' }}
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />
          <Input
            placeholder="Usuario"
            style={{ height: '50px' }}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <Input
              placeholder="Contraseña"
              style={{ height: '50px' }}
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <Input
              placeholder="Volver a escribir la contraseña"
              style={{ height: '50px' }}
              type="password"
            />
          </div>
        </div>
        <div className="btn_box">
          <button className="login_btn" onClick={handleRegister}>
            CONTINUAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
