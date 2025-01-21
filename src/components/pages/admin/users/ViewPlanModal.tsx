import React from 'react';
import { Modal, Form, Input, Spin } from 'antd';
import moment from 'moment';

interface ViewPlanModalProps {
  visible: boolean;
  onClose: () => void;
  userData: {
    mensajes_disponibles: number;
    mensajes_enviados: number;
    mensajes_recibidos: number;
    plan: string;
    fecha_inicio: Date;
    fecha_fin: Date;
  } | null;
  // planes_usuarios: Array<{
  //   mensajes_adquiridos: number;
  //   fecha_inicio: string;
  //   fecha_fin: string;
  // }> | null;
}

const ViewPlanModal: React.FC<ViewPlanModalProps> = ({ visible, onClose, userData }) => {
  const [form] = Form.useForm();

  if (!userData) {
    return (
      <Modal
        visible={visible}
        onCancel={onClose}
        title="Detalles del Plan"
        footer={null}
      >
        <Spin />
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title="Detalles del Plan"
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Nombre del Plan">
          <Input value={userData?.plan} readOnly />
        </Form.Item>
        <Form.Item label="Mensajes Disponibles">
          <Input value={userData?.mensajes_disponibles} readOnly />
        </Form.Item>
        <Form.Item label="Mensajes Enviados">
          <Input value={userData?.mensajes_enviados} readOnly />
        </Form.Item>
        <Form.Item label="Mensajes Recibidos">
          <Input value={userData?.mensajes_recibidos} readOnly />
        </Form.Item>
        <Form.Item label="Fecha de Inicio">
          <Input value={userData?.fecha_inicio ? moment(userData.fecha_inicio).format('YYYY-MM-DD HH:mm') : 'N/A'} readOnly />
        </Form.Item>
        <Form.Item label="Fecha de Fin">
          <Input value={userData?.fecha_fin ? moment(userData.fecha_fin).format('YYYY-MM-DD HH:mm') : 'N/A'} readOnly />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewPlanModal;