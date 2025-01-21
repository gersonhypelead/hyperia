import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FetchPlanesReducer } from '../../../../redux/actions/planes/planesActions';
import { FetchUsuariosReducer, PaquetesUsuariosReducer, UpdatePlanUserReducer } from '../../../../redux/actions/users/usuariosActions';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import { FetchPaquetesMensajesReducer } from '../../../../redux/actions/paquetes_mensajes/paquetesMensajesAction';


interface UpdatePlanesMensajesModalProps {
  visible: boolean;
  onClose: () => void;
  userData: {
    id: number;
  };
}
const { Option } = Select;

const UpdatePlanModal: React.FC<UpdatePlanesMensajesModalProps> = ({ visible, onClose, userData }) => {
    
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const {
    rex_paquetes_mensajes,
  } = useSelector(({ paquetesMensajes }: RootState) => paquetesMensajes);

  useEffect(() => {
    dispatch(FetchPaquetesMensajesReducer());
  }, [dispatch]);

  
  useEffect(() => {
  }, [userData, form]);

  const handleSubmit = async (values: { paquete_mensaje_id: number }) => {
    if (!userData) return;
    setLoading(true);
    try {
      await dispatch(PaquetesUsuariosReducer({
        paquete_mensaje_id: values.paquete_mensaje_id,
        usuario_id: userData.id,
      }));
      message.success('Paquete de Usuario agregado correctamente');
      dispatch(FetchUsuariosReducer)
      onClose();
    } catch (error) {
      message.error('Error al actualizar el plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title="Paquetes de Mensajes"
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="paquete_mensaje_id"
          label="Elige el Paquete de mensajes"
          rules={[{ required: true, message: 'Por favor seleccione el paquete de mensajes' }]}
        >
          <Select placeholder="Seleccione un plan">
            {rex_paquetes_mensajes && rex_paquetes_mensajes.map((paquete: any) => (
              <Option key={paquete.id} value={paquete.id}>
                {paquete.paquete}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Agregar Paquete de Mensajes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePlanModal;