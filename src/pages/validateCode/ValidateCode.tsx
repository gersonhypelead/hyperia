import React, { useEffect, useState } from 'react';
import { Input, Button, notification } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRightOutlined, CopyOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { validateCode, resendCode } from '../../redux/actions/auth/ValidateCode';

const ValidateCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const email = location.state?.email;

  // Estado para manejar los valores del código
  const [codigo, setCodigo] = useState<string[]>(Array(6).fill(''));
  const [isValidating, setIsValidating] = useState(false);

  // Estado para la cuenta regresiva
  const [countdown, setCountdown] = useState(30);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  const validationError = useSelector((state: RootState) => state.validateCode?.validationError);
  const validationSuccess = useSelector((state: RootState) => state.validateCode?.validationSuccess);

  // Efecto para manejar la cuenta regresiva
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(timer);
          setIsResendEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Efecto para navegar en caso de validación exitosa
  useEffect(() => {
    if (validationSuccess) {
      notification.success({
        message: 'Código verificado',
        description: 'Código validado correctamente.',
      });
      navigate('/'); // Redirige a la siguiente pantalla después de validar
    }
  }, [validationSuccess, navigate]);

  // Efecto para mostrar error si la validación falla
  useEffect(() => {
    if (validationError) {
      notification.error({
        message: 'Error de validación',
        description: validationError,
      });
    }
  }, [validationError]);

  // Manejar el cambio en los campos de entrada del código
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d$/.test(value)) {
      const newCodigo = [...codigo];
      newCodigo[index] = value;
      setCodigo(newCodigo);

      const nextInput = document.getElementsByName(`codigo[${index + 1}]`)[0] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    } else if (value === '') {
      const newCodigo = [...codigo];
      newCodigo[index] = '';
      setCodigo(newCodigo);
    }
  };

  // Manejar el envío del código para validación
  const handleSubmit = async () => {
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length === 6) {
      try {
        setIsValidating(true);
        // Enviamos 'codigo_verificacion' en lugar de 'codigo'
        const response = await dispatch(validateCode(parseInt(codigoCompleto, 10)));
        if (response.respuesta) {
          navigate('/login'); // Redirige a la página de login
        } else {
          // Si no es exitosa, mantén al usuario en la página de validación
          notification.error({
            message: 'Código incorrecto',
            description: 'Por favor, ingresa el código correcto.',
          });
        }
      } catch (error: any) {
        // En caso de error en la validación, también permanece en la página de validación
        notification.error({
          message: 'Error al validar el código',
          description: error.message,
        });
      } finally {
        setIsValidating(false);
      }
    } else {
      notification.warning({
        message: 'Código incompleto',
        description: 'Por favor ingresa el código completo.',
      });
    }
  };

  // Función para manejar el reenvío del código
  const handleResendCode = async () => {

    if (!email) {
      alert("No se pudo reenviar el código, ya que el correo electrónico es inválido.");
      return;
    }

    try {
      await dispatch(resendCode(email)); // Llamada a la acción para reenviar el código
      notification.success({
        message: 'Código reenviado',
        description: 'El código de verificación ha sido reenviado a tu correo.',
      });

      setCountdown(30); // Reinicia la cuenta regresiva
      setIsResendEnabled(false); // Deshabilita el botón de reenviar hasta que pase el tiempo
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Error al reenviar el código.',
      });
    }
  };


  return (
    <div className="container">
      <div className="left">
        <h1>Verifica tu cuenta</h1>
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
          <h1 style={{ color: '#03a9f4' }}>Validación</h1>
          <Link
            style={{ color: '#03a9f4', textDecoration: 'none' }}
            to={'/register'}
          >
            <ArrowRightOutlined /> Regresar al registro
          </Link>
        </div>
        <h3 style={{
          alignItems: 'center',
        }}>
          Ingresa el código de 6 dígitos que hemos enviado a tu correo electrónico{' '}
          {email}
        </h3>
        <div className="input_box">
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Input
                key={index}
                name={`codigo[${index}]`}
                value={codigo[index]}
                maxLength={1}
                onChange={(e) => handleInputChange(e, index)}
                style={{
                  textAlign: 'center',
                  height: '50px',
                  width: '70px',
                  fontSize: '20px',
                }}
              />
            ))}
            <button
              className="login_btn"
              onClick={() => {
                const codigoCompleto = codigo.join('');
                navigator.clipboard.writeText(codigoCompleto);
                notification.success({
                  message: 'Código copiado',
                  description: 'El código ha sido copiado al portapapeles',
                });
              }}
              style={{
                width: '50px'
              }}
            >
              <CopyOutlined style={{ fontSize: '24px' }} />
            </button>
          </div>
        </div>
        <div className="btn_box">
          <button
            className="login_btn"
            onClick={handleSubmit}
            disabled={isValidating}
          >
            {isValidating ? 'Verificando...' : 'Validar Código'}
          </button>
        </div>

        {/* Mostrar temporizador y botón de reenvío */}
        <h3 className="resend-text">
          ¿No recibiste el código?{' '}
          {countdown > 0 ? (
            <span>{`Espere ${countdown} segundos`}</span>
          ) : (
            <Link
              className="resend-btn"
              to=""
              onClick={handleResendCode}
            >
              Reenviar código
            </Link>
          )}
        </h3>
      </div>
    </div>
  );
};

export default ValidateCode;
