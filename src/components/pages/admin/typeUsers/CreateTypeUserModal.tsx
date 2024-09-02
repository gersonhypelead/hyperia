// src/components/CreateTypeUserModal.tsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTiposUsuarios } from '../../../../redux/actions/tipo_usuarios/tiposUsuariosActions';
import { RootState, AppDispatch } from '../../../../redux/store/store';
import { createTypeUser } from '../../../../redux/actions/tipo_usuarios/tiposUsuariosActions';

interface CreateTypeUserModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateTypeUserModal: React.FC<CreateTypeUserModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const {
    rex_tiposUsuarios,
    rex_meta,
  } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios);
  // const { loading, tiposUsuarios } = useSelector((state: RootState) => ({
  //   loading: state.user.loading,
  //   tiposUsuarios: state.tipoUsuarios.tiposUsuarios, // Ajusta esto según la estructura de tu store
  // }));

  const handleTypeCreateUser = async () => {
    try {
      const values = await form.validateFields();
      await dispatch(createTypeUser(values));
      message.success('Usuario creado correctamente'); // Mostrar mensaje de éxito
      onClose(); // Cerrar el modal
      form.resetFields();
      dispatch(fetchTiposUsuarios(
        rex_meta.page,
        rex_meta.limit,
      ));
      
      // dispatch(FetchUsuariosReducer)// Restablecer el formulario
    } catch (error) {
      message.error('Error al crear el usuario'); // Mostrar mensaje de error
      console.error('Validation failed:', error);
    }
  };
  return (
    <Modal
      title="Crear Tipo de Usuario"
      visible={visible}
      onCancel={onClose}
      onOk={handleTypeCreateUser}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="tipo_usuario"
          label="Tipo de Usuario"
          rules={[{ required: true, message: 'Por favor ingrese el tipo de usuario' }]}
        >
        <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTypeUserModal;
