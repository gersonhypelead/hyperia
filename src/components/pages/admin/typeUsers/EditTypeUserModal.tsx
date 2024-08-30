import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTiposUsuarios } from '../../../../redux/actions/tipo_usuarios/tiposUsuariosActions';
import { RootState, AppDispatch } from '../../../../redux/store/store';

interface EditTypeUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  user: any;
}

const EditTypeUserModal: React.FC<EditTypeUserModalProps> = ({ visible, onClose, onSave, user }) => {

  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const {
    rex_loading,
  } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        tipo_usuario: user.tipo_usuario, 
      });
    }
  }, [dispatch, visible, user, form]);


  const handleSaveUser = async () => {
    const loadingMessage = message.loading('Guardando...', 0);

    try {
      const values = await form.validateFields();
      onSave(values);
    } catch (error) {
      message.error('Error al guardar');
      console.error('Validation failed:', error);
    } finally {
      loadingMessage();
    }
  };

  return (
    <Modal
      title="Editar Usuario"
      visible={visible}
      onCancel={onClose}
      onOk={handleSaveUser}
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
