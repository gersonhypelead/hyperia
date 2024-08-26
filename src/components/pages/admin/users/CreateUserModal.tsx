// src/components/CreateUserModal.tsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTiposUsuarios } from '../../../../redux/actions/tipo_usuarios/tiposUsuariosActions';
import { RootState, AppDispatch } from '../../../../redux/store/store';
import { FetchUsuariosReducer, createUser } from '../../../../redux/actions/users/usuariosActions';

interface CreateUserModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  // const { loading, tiposUsuarios } = useSelector((state: RootState) => ({
  //   loading: state.user.loading,
  //   tiposUsuarios: state.tipoUsuarios.tiposUsuarios, // Ajusta esto según la estructura de tu store
  // }));

  const {
    rex_loading, rex_tiposUsuarios
  } = useSelector(({tipoUsuarios}: any) => tipoUsuarios);

  useEffect(() => {
    dispatch(fetchTiposUsuarios());
  }, [dispatch]);

  const handleCreateUser = async () => {
    try {
      const values = await form.validateFields();
      await dispatch(createUser(values));
      message.success('Usuario creado correctamente'); // Mostrar mensaje de éxito
      onClose(); // Cerrar el modal
      form.resetFields(); 
      // dispatch(FetchUsuariosReducer)// Restablecer el formulario
    } catch (error) {
      message.error('Error al crear el usuario'); // Mostrar mensaje de error
      console.error('Validation failed:', error);
    }
  };
  return (
    <Modal
      title="Crear Usuario"
      visible={visible}
      onCancel={onClose}
      onOk={handleCreateUser}
      confirmLoading={rex_loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ required: true, message: 'Por favor ingrese el nombre del usuario' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="apellido_paterno"
          label="Apellido Paterno"
          rules={[{ required: true, message: 'Por favor ingrese el apellido paterno del usuario' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="apellido_materno"
          label="Apellido Materno"
          rules={[{ required: true, message: 'Por favor ingrese el apellido materno del usuario' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Por favor ingrese el email del usuario' },
            { type: 'email', message: 'El email ingresado no es válido' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="usuario"
          label="Usuario"
          rules={[{ required: true, message: 'Por favor ingrese el nombre de usuario' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tipo_usuario_id"
          label="Tipo Usuario"
          rules={[{ required: true, message: 'Por favor seleccione el tipo de usuario' }]}
        >
          <Select placeholder="Seleccione un tipo de usuario" loading={rex_loading}>
            {rex_tiposUsuarios.map((tipo: any) => (
              <Select.Option key={tipo.id} value={tipo.id}>
                {tipo.tipo_usuario}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="contrasena"
          label="Contraseña"
          rules={[{ required: true, message: 'Por favor ingrese la contraseña' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
