import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTiposUsuarios } from '../../../../redux/actions/tipo_usuarios/tiposUsuariosActions';
import { RootState, AppDispatch } from '../../../../redux/store/store';

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  user: any;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ visible, onClose, onSave, user }) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const {
    loading,
    tiposUsuarios
  } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios);

  const [initialTipoUsuarioId, setInitialTipoUsuarioId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (visible) {
      dispatch(fetchTiposUsuarios());
    }
  }, [dispatch, visible]);

  useEffect(() => {
    if (user && tiposUsuarios.length > 0) {
      const tipoUsuarioId = tiposUsuarios.find((tipo: any) => tipo.tipo_usuario === user.tipo_usuario)?.id;
      setInitialTipoUsuarioId(tipoUsuarioId);
      form.setFieldsValue({
        ...user,
        tipo_usuario_id: tipoUsuarioId,
      });
    }
  }, [user, tiposUsuarios, form]);

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
      confirmLoading={loading}
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
          <Select
            placeholder="Seleccione un tipo de usuario"
            loading={loading}
            value={initialTipoUsuarioId}
          >
            {tiposUsuarios.map((tipo: any) => (
              <Select.Option key={tipo.id} value={tipo.id}>
                {tipo.tipo_usuario}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="contrasena"
          label="Contraseña"
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
