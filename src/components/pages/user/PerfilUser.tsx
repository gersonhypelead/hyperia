import React, { useEffect, useState } from 'react';
import { Typography, Divider, Card, Input, Button, Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../../redux/actions/users/usuariosActions';
import { AppDispatch } from '../../../redux/store/store';
import { fetchTiposUsuarios } from '../../../redux/actions/tipo_usuarios/tiposUsuariosActions';

const { Title } = Typography;
const { Option } = Select;

interface UserProfileValues {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  usuario: string;
  tipo_usuario_id: number;
}

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('Nombre es requerido'),
  apellido_paterno: Yup.string().required('Apellido Paterno es requerido'),
  apellido_materno: Yup.string().required('Apellido Materno es requerido'),
  usuario: Yup.string().required('Usuario es requerido'),
});

const UserProfile: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const { rex_user_auth } = useSelector(({ auth }: any) => auth);
  const { rex_tiposUsuarios } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios);

  const [initialTipoUsuario, setInitialTipoUsuario] = useState<string | undefined>(undefined);


  useEffect(() => {
    dispatch(fetchTiposUsuarios());
  }, [dispatch]);

  useEffect(() => {
    if (rex_tiposUsuarios.length > 0 && rex_user_auth && rex_user_auth.tipo_usuario_id) {
      const currentTipoUsuario = rex_tiposUsuarios.find(
        (tipo: any) => tipo.id === rex_user_auth.tipo_usuario_id
      );
      setInitialTipoUsuario(currentTipoUsuario?.tipo_usuario);
    }
  }, [rex_tiposUsuarios, rex_user_auth]);


  if (!rex_user_auth || !rex_user_auth.personas) {
    return <div>User not found</div>;
  }

  if (!rex_user_auth || !rex_user_auth.personas) {
    return <div>User not found</div>;
  }

  const { personas } = rex_user_auth;

  const initialValues: UserProfileValues = {
    nombre: personas.nombre || '',
    apellido_paterno: personas.apellido_paterno || '',
    apellido_materno: personas.apellido_materno || '',
    usuario: rex_user_auth.usuario || '',
    tipo_usuario_id: rex_user_auth.tipo_usuario_id || '',
  };

  const handleSubmit = async (values: UserProfileValues) => {
    try {
      const updatedUser = {
        id: rex_user_auth.id,
        nombre: values.nombre,
        apellido_paterno: values.apellido_paterno,
        apellido_materno: values.apellido_materno,
        usuario: values.usuario,
        tipo_usuario_id: values.tipo_usuario_id,
      };
      await dispatch(updateUser(updatedUser));
      message.success('Usuario actualizado con éxito');
      // window.location.reload();
    } catch (error) {
      message.error('Error al actualizar el usuario');
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>Perfil de Usuario</Title>
      <Card>
        <Title level={4}>Información Básica</Title>
        <Divider />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div style={{ marginBottom: '16px' }}>
                <label>Nombre</label>
                <Field name="nombre">
                  {({ field }: any) => <Input {...field} />}
                </Field>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Apellido Paterno</label>
                <Field name="apellido_paterno">
                  {({ field }: any) => <Input {...field} />}
                </Field>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Apellido Materno</label>
                <Field name="apellido_materno">
                  {({ field }: any) => <Input {...field} />}
                </Field>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Correo</label>
                <Field name="usuario">
                  {({ field }: any) => <Input {...field} disabled />}
                </Field>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Tipo de Usuario</label>
                <Field name="tipo_usuario_id">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      disabled
                      defaultValue={rex_tiposUsuarios.tipo_usuario}
                      onChange={(value) => setFieldValue('tipo_usuario_id', value)}
                      style={{ width: '100%' }}
                      alue={initialTipoUsuario}
                    >
                      {rex_tiposUsuarios.map((tipo: any) => (
                        <Select.Option key={tipo.id} value={tipo.id}>
                          {tipo.tipo_usuario}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Field>
              </div>
              <Button type="primary" htmlType="submit">
                Guardar
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default UserProfile;
