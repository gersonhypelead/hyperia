import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FetchTiposUsuariosReducer, updateTypeUser } from '../../../../redux/actions/tipo_usuarios/tiposUsuariosActions';
import { AppDispatch } from '../../../../redux/store/store';

interface EditTypeUserModalProps {
  visible: boolean;
  onClose: () => void;
  user: any;
}

const EditTypeUserModal: React.FC<EditTypeUserModalProps> = ({ visible, onClose, user }) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  
  const {
    rex_meta,
    rex_loading,
    rex_sortColumn,
    rex_sortOrder
  } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios);

  useEffect(() => {
    if (visible && user) {
      form.setFieldsValue({
        tipo_usuario: user.tipo_usuario, 
      });
    }
  }, [visible, user, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedUser = {
        id: user.id,
        tipo_usuario: values.tipo_usuario,
      };

      await dispatch(updateTypeUser(updatedUser));
      message.success('Tipo de Usuario actualizado correctamente');
      dispatch(FetchTiposUsuariosReducer(rex_meta.page, rex_meta.limit, rex_sortColumn, rex_sortOrder));
      onClose();
    } catch (error) {
      message.error('Error al actualizar el tipo usuario');
      console.error('Update failed:', error);
    }
  };

  return (
    <Modal
      title="Editar Usuario"
      visible={visible}
      onCancel={onClose}
      onOk={handleSave}
      confirmLoading={rex_loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="tipo_usuario"
          label="Tipo de usuario"
          rules={[{ required: true, message: 'Por favor ingrese el tipo de usuario' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTypeUserModal;