import React, { useEffect, useState, useRef } from 'react';
import { Typography, Divider, Card, Input, Button, Select, message, Avatar, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../redux/actions/users/usuariosActions';
import { AppDispatch } from '../../redux/store/store';
import { FetchTiposUsuariosReducer } from '../../redux/actions/tipo_usuarios/tiposUsuariosActions';
import { updateTimezoneReducer } from '../../redux/actions/update_timezone/Update_timezone';
import { EditOutlined, SafetyOutlined, WalletOutlined } from '@ant-design/icons';
import '../../styles/pages/profile/Profile.css'
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

interface UserProfileValues {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  usuario: string;
  tipo_usuario_id: number;

  email: string;
  contrasena: string;
  estado: boolean;
}

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('Nombre es requerido'),
  apellido_paterno: Yup.string().required('Apellido Paterno es requerido'),
  apellido_materno: Yup.string().required('Apellido Materno es requerido'),
});

const Profile: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { rex_user_auth } = useSelector(({ auth }: any) => auth);
  const { rex_tiposUsuarios } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios);
  const timezoneState = useSelector(({ timezone }: any) => timezone);
  // const timezone = timezoneState?.timezone || '';
  const timezone = rex_user_auth?.timezone || '';
  const formRef = useRef<any>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [initialTipoUsuario, setInitialTipoUsuario] = useState<string | undefined>(undefined);
  const [timezoneSelected, setTimezoneSelected] = useState<string>(timezone || "Europe/Madrid");

  // Estados para controlar la edición y cancelación
  const [profile, setProfile] = useState<UserProfileValues>({
    nombre: rex_user_auth?.personas?.nombre || '',
    apellido_paterno: rex_user_auth?.personas?.apellido_paterno || '',
    apellido_materno: rex_user_auth?.personas?.apellido_materno || '',
    usuario: rex_user_auth?.usuario || '',
    email: rex_user_auth?.email || '',
    contrasena: '',
    tipo_usuario_id: rex_user_auth?.tipo_usuario_id || 0,
    estado: rex_user_auth?.estado || true,
  });
  const [tempProfile, setTempProfile] = useState(profile);  // Para cancelar


  useEffect(() => {
    dispatch(FetchTiposUsuariosReducer());
  }, [dispatch]);

  useEffect(() => {
    if (rex_tiposUsuarios.length > 0 && rex_user_auth && rex_user_auth.tipo_usuario_id) {
      const currentTipoUsuario = rex_tiposUsuarios.find(
        (tipo: any) => tipo.id === rex_user_auth.tipo_usuario_id
      );
      setInitialTipoUsuario(currentTipoUsuario?.tipo_usuario);
    }
  }, [rex_tiposUsuarios, rex_user_auth]);

  // Manejar edición y cancelación
  const handleEdit = () => {
    if (isEditing) {
      setProfile(tempProfile); // Guardar cambios
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setTempProfile(profile); // Restaurar valores originales
    setIsEditing(false);
  };

  const handleChange = (field: keyof UserProfileValues, value: string) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };


  // Mover la declaración de 'personas' fuera de la condición
  const personas = rex_user_auth?.personas;

  // Efecto que se ejecuta cuando el nombre cambia en el estado de redux
  useEffect(() => {
    if (!isEditing) {
      // Si ya no está en modo edición, el saludo se actualizará automáticamente
    }
  }, [rex_user_auth?.personas?.nombre]); // Escuchar cambios en el nombre

  // Actualizar el huso horario en el estado local y enviarlo a la API
  const handleTimezoneChange = (value: string) => {
    console.log('Nuevo huso horario seleccionado:', value);
    setTimezoneSelected(value); // Actualiza localmente
    dispatch(updateTimezoneReducer(value)); // Enviar actualización a la API
  };

  useEffect(() => {
    if (timezone) {
      setTimezoneSelected(timezone);  // Establece el huso horario almacenado en el estado local.
    }
  }, [timezone]);

  // Mueve esta validación condicional al final, después de los hooks
  if (!rex_user_auth || !rex_user_auth.personas) {
    return <div>User not found</div>;
  }

  // const { personas } = rex_user_auth;

  const initialValues: UserProfileValues = {
    nombre: personas.nombre || '',
    apellido_paterno: personas.apellido_paterno || '',
    apellido_materno: personas.apellido_materno || '',
    usuario: rex_user_auth.usuario || '',
    email: rex_user_auth.email || '',  // Este campo no será visible pero lo necesitamos
    contrasena: '',            // Puedes usar un valor por defecto para la contraseña
    tipo_usuario_id: rex_user_auth.tipo_usuario_id || '', // Este campo no será editable
    estado: rex_user_auth.estado || true // Campo que no será visible pero es necesario para la API
  };

  const handleSubmit = async (values: UserProfileValues) => {
    try {
      const updatedUser = {
        nombre: values.nombre,
        apellido_paterno: values.apellido_paterno,
        apellido_materno: values.apellido_materno,
        usuario: values.usuario,
        email: rex_user_auth.email,  // No se muestra pero se envía
        contrasena: values.contrasena,
        tipo_usuario_id: rex_user_auth.tipo_usuario_id, // Campo fijo no editable
        estado: rex_user_auth.estado // Campo fijo no editable
      };

      await dispatch(updateUser(rex_user_auth.id, updatedUser));
      message.success('Usuario actualizado con éxito');
      window.location.reload();
      setIsEditing(false);
    } catch (error) {
      message.error('Error al actualizar el usuario');
      console.error('Error al actualizar el usuario:', error);
    }
  };



  return (
    <>

      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Encabezado con bienvenida */}
        <Card className="no-border-radius" style={{ paddingRight: '50px', marginTop: '-50px', marginBottom: '24px', textAlign: 'left', padding: '40px', boxShadow: 'none', background: '#D2DFFF', width: '1000px', height: '250px' }}>
          <div style={{ position: 'relative' }}>
            <img
              src="data:image/svg+xml,%3csvg viewBox='0 0 376 335' xmlns='http://www.w3.org/2000/svg' fill='%23bed1ff' %3e %3cpath fillOpacity='0.7' d='M216.845 329.272C279.466 348.683 346.588 312.388 368.6 247.959V247.959L368.706 247.645C369.086 246.526 369.451 245.401 369.803 244.264V244.264C388.008 185.485 363.037 124.069 313.218 96.7516V96.7516C310.337 95.17 308.283 92.3641 307.667 89.0517V89.0517C300.488 50.4534 273.699 17.4979 234.92 5.47811V5.47811C187.076 -9.35305 136.277 12.4183 110.554 55.2119V55.2119C105.381 63.8178 96.3472 69.2187 86.5939 69.65V69.65C50.0628 71.2633 16.337 96.5504 4.4498 134.931V134.931C-10.5201 183.268 14.8136 234.068 61.0353 248.396V248.396C77.6054 253.532 94.61 253.285 110.297 248.624V248.624C123.92 244.579 138.195 251.295 144.108 264.352V264.352C157.389 293.668 181.701 317.286 213.546 328.196V328.196C214.637 328.57 215.735 328.928 216.845 329.272' /%3e %3c/svg%3e"
              alt="Nube"
              style={{
                position: 'absolute',
                top: '-60px',
                right: '-60px',
                zIndex: 1,
                width: '250px',
                height: 'auto',
              }}
            />
            <img
              src="https://account.hotmart.com/50452993b0b9cbf2a5dc51067052eac8.svg"
              alt="Imagen"
              style={{
                position: 'absolute',
                top: '-90px',
                right: '0',
                zIndex: 2,
                width: '250px',
                height: 'auto',
              }}
            />
            <Row align="middle">
              <Col span={4}>
                <Avatar className="big-font-size" size={90} style={{ backgroundColor: '#355CC0', position: 'absolute', left: '20px', top: '80px', zIndex: 3, fontSize: '46px' }}>
                  {`${personas.nombre.charAt(0)}${personas.apellido_paterno.charAt(0)}`}
                </Avatar>
              </Col>
              <Col span={20} style={{ marginLeft: '-160px', marginTop: '-60px' }}>
                <Title level={1} >{`¡Hola, ${personas.nombre}!`}</Title>
                <Text>Gestiona la información de tu perfil en un solo lugar</Text>
              </Col>
            </Row>
          </div>
        </Card>

        {/* Información Personal */}
        <Card className="with-border-radius" style={{ marginLeft: '50px', width: '900px', marginBottom: '24px', marginTop: '-50px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={1} style={{ marginTop: '50px', marginBottom: '-10px' }}>Información Personal</Title>
            {/* Botones para editar/guardar y cancelar */}
            {isEditing && (
              <Button
                className="cancel-button"
                onClick={() => {
                  setIsEditing(false); // Salir del modo edición
                  formRef.current?.resetForm(); // Restablecer el formulario a sus valores iniciales
                }}
              >
                Cancelar
              </Button>
            )}
            <Button
              className="edit-button"
              icon={<EditOutlined />}
              onClick={() => {
                if (isEditing) {
                  // Enviar el formulario si estamos en modo de edición
                  if (formRef.current) {
                    formRef.current.handleSubmit(); // Llamar a handleSubmit del formulario a través de la referencia
                  }
                }
                setIsEditing(!isEditing); // Alternar entre editar y no editar
              }}
            >
              {isEditing ? 'Guardar' : 'Editar'}
            </Button>
          </div>
          <Divider />
          <Formik
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className="form-item">
                  <label>Nombre</label>
                  {isEditing ? (
                    <Field name="nombre">
                      {({ field }: any) => <Input {...field} />}
                    </Field>
                  ) : (
                    <Text className="field-display">{values.nombre}</Text>
                  )}
                </div>

                <div className="form-item">
                  <label>Apellido(s)</label>
                  {isEditing ? (
                    <Field name="apellido_paterno">
                      {({ field }: any) => <Input {...field} />}
                    </Field>
                  ) : (
                    <Text className="field-display">{values.apellido_paterno} {values.apellido_materno}</Text>
                  )}
                </div>

                {/* Campo Contraseña */}
                <div className="form-item custom-profile-input">
                  <label>Contraseña</label>
                  {isEditing ? (
                    <Field name="contrasena">
                      {({ field }: any) => <Input {...field} />}
                    </Field>
                  ) : (
                    <Text className="field-display">********</Text>
                  )}
                </div>

                {/* Correo */}
                <div className="form-item">
                  <label>Correo</label>
                  <Input value={values.usuario} disabled />
                </div>

                {/* Tipo de Usuario */}
                <div className="form-item">
                  <label>Tipo de Usuario</label>
                  <Select
                    value={initialTipoUsuario}
                    disabled
                    placeholder="Seleccionar tipo de usuario"
                  >
                    {rex_tiposUsuarios.map((tipo: any) => (
                      <Option key={tipo.id} value={tipo.id}>
                        {tipo.tipo_usuario}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Form>
            )}
          </Formik>
        </Card>

        {/* Configuraciones */}
        <Card className="with-border-radius" style={{ marginLeft: '50px', width: '900px', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={1}>Configuraciones</Title>
            {isEditing && (
              <Button
                className="cancel-button"
                onClick={() => {
                  setIsEditing(false); // Salir del modo edición
                  setTimezoneSelected(timezone); // Restablecer el valor original del huso horario
                }}
                style={{ marginRight: '-340px' }}
              >
                Cancelar
              </Button>
            )}
            <Button
              className="edit-button"
              icon={<EditOutlined />}
              onClick={() => {
                if (isEditing) {
                  if (timezone !== timezoneSelected) {
                    console.log('Actualizando huso horario:', timezoneSelected); // Verificar antes de enviar
                    dispatch(updateTimezoneReducer(timezoneSelected));
                    message.success('Huso horario actualizado con éxito');
                  }
                }
                setIsEditing(!isEditing); // Alternar entre editar y no editar
              }}
            >
              {isEditing ? 'Guardar' : 'Editar'}
            </Button>
          </div>
          <Divider />
          <div className="form-item">
            <label>Idioma</label>
            <Text className="field-display">Español</Text>
          </div>

          {/* Huso horario */}
          <div className="form-item">
            <label>Huso horario</label>
            {/* <button
              onClick={() => {
                console.log("timezoneSelected: -----");
                console.log(timezoneState);
                console.log(timezone);
                console.log(rex_user_auth.timezone);
              }}
            >
              clic
            </button> */}
            {isEditing ? (
              <Select
                value={timezoneSelected}
                onChange={(value) => setTimezoneSelected(value)}
                style={{ width: '100%' }}
              >
                {/* Agrega las opciones de huso horario */}
                <Option value="Europe/Madrid">Europe/Madrid - Hora de España (+02:00)</Option>
                <Option value="America/Mexico_City">America/Mexico City - Hora de México (-06:00)</Option>
                <Option value="America/Lima">America/Lima - Hora de Perú (-03:00)</Option>
                <Option value="America/Sao_Paulo">America/Sao Paulo - Hora de Brasil (-03:00)</Option>
                {/* Agrega más opciones según sea necesario */}
              </Select>
            ) : (
              <Text className="field-display">{timezoneSelected}</Text>
            )}
          </div>
        </Card>

        {/* Privacidad y seguridad */}
        <Card className="with-border-radius" style={{ marginLeft: '50px', width: '900px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={1}>Privacidad y seguridad</Title>
            <Button className="edit-button" icon={<SafetyOutlined />}>Entrar</Button>
          </div>
          <Divider />
          <Text className="field-display">Cambia tu contraseña, cierra las sesiones abiertas en otros dispositivos y accede a los datos de tu cuenta.</Text>
        </Card>

        {/* Gestiona tu suscripción */}
        <Card className="with-border-radius" style={{ marginLeft: '50px', width: '900px', position: 'relative', zIndex: 2, marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={1}>Gestiona tu suscripción</Title>
            <Button 
              className="edit-button" icon={<WalletOutlined />}
              onClick={() => navigate('/precios')}
            >Precios</Button>
          </div>
          <Divider />
          <Text className="field-display">Cambia tu suscripción y accede a mas beneficios.</Text>
        </Card>
      </div>
    </>
  );
};

export default Profile;
