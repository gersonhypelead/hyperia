import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FetchTiposUsuariosReducer, createTypeUser } from '../../../../redux/actions/tipo_usuarios/tiposUsuariosActions';
import { RootState, AppDispatch } from '../../../../redux/store/store';

const CreateTypeUserButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const {
    rex_tiposUsuarios,
    rex_meta,
  } = useSelector(({ tipoUsuarios }: any) => tipoUsuarios);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleTypeCreateUser = async () => {
    try {
      const values = await form.validateFields();
      await dispatch(createTypeUser(values));
      message.success('Usuario creado correctamente');
      handleCloseModal();
      dispatch(FetchTiposUsuariosReducer(
        rex_meta.page,
        rex_meta.limit,
      ));
    } catch (error) {
      message.error('Error al crear el usuario');
      console.error('Validation failed:', error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className="boton-crear">
        Crear Tipo de Usuario
      </Button>
      <Modal
        title="Crear Tipo de Usuario"
        visible={isModalVisible}
        onCancel={handleCloseModal}
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
    </>
  );
};

export default CreateTypeUserButton;