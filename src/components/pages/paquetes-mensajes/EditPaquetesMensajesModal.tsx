import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';
import { FetchPaquetesMensajesReducer, UpdatePaquetesMensajesReducer } from '../../../redux/actions/paquetes_mensajes/paquetesMensajesAction';


interface EditPaqueteMensajesModalProps {
  visible: boolean;
  onClose: () => void;
  paqueteMensajes: any;
}

const EditPaqueteMensajesModal: React.FC<EditPaqueteMensajesModalProps> = ({ visible, onClose, paqueteMensajes }) => {

  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (paqueteMensajes){
      form.setFieldsValue({
        paquete: paqueteMensajes.paquete || '', 
        total_mensaje: paqueteMensajes.total_mensaje || '', // Obtén el apellido paterno de `user.personas`
        precio_eur: paqueteMensajes.precio_eur || '', // Obtén el apellido materno de `user.personas`
      });
      
    }
    
  }, [paqueteMensajes,form]);

  const handleSaveUser = async () => {
    const loadingMessage = message.loading('Guardando...', 0);

    try {
      const paquetesMensajesData = await form.validateFields();

      paquetesMensajesData.total_mensaje = parseInt(paquetesMensajesData.total_mensaje);
      paquetesMensajesData.precio_eur = parseFloat(paquetesMensajesData.precio_eur);

      const paquetesMensajesToUpdate = {
        ...paquetesMensajesData,
        id: paqueteMensajes.id,
      };

      await dispatch(UpdatePaquetesMensajesReducer(paquetesMensajesToUpdate.id, paquetesMensajesData));
      message.success('Guardado con éxito');
      
      await dispatch(FetchPaquetesMensajesReducer()); 

      onClose();
    } catch (error) {
      message.error('Error al guardar');
      console.error('Error de validación:', error);
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
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="paquete"
          label="Paquete"
          rules={[{ required: true, message: 'Por favor ingrese el paquete' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="total_mensaje"
          label="Total de mensajes"
          rules={[{ required: true, message: 'Por favor ingrese el Total de mensajes' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="precio_eur"
          label="Precio en Euros"
          rules={[{ required: true, message: 'Por favor ingrese el Precio en Euros' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPaqueteMensajesModal;
