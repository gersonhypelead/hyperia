import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store/store';
import { CreatePlanesReducer, FetchPlanesReducer } from '../../../redux/actions/planes/planesActions';

interface CreatePlanesModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreatePlanModal: React.FC<CreatePlanesModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { rex_meta, rex_sortColumn, rex_sortOrder, filters } = useSelector((state: RootState) => state.planes);
  const { rex_loading } = useSelector(({tipoUsuarios}: any) => tipoUsuarios);

  const handleCreateUser = async () => {
    try {
      const values = await form.validateFields();
      // Ensure total_mensaje is a number
      const planData = {
        ...values,
        total_mensaje: Number(values.total_mensaje)
      };
      await dispatch(CreatePlanesReducer(planData));
      message.success('Plan creado correctamente');
      onClose();
      form.resetFields();
      dispatch(FetchPlanesReducer(
        rex_meta.page,
        rex_meta.limit,
        rex_sortColumn,
        rex_sortOrder,
        filters
      ));
    } catch (error) {
      message.error('Error al crear el plan');
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Crear Plan"
      open={visible}
      onCancel={onClose}
      onOk={handleCreateUser}
      confirmLoading={rex_loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="plan"
          label="Nombre del Plan"
          rules={[{ required: true, message: 'Por favor ingrese el nombre del plan' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Precio"
          rules={[{ required: true, message: 'Por favor ingrese el precio del plan' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="total_mensaje"
          label="Total de Mensajes"
          rules={[
            { required: true, message: 'Por favor ingrese el total de mensajes' },
            { type: 'number', message: 'El valor debe ser un número' }
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="dias_disponible"
          label="Dias Disponibles"
          rules={[
            { required: true, message: 'Por favor ingrese el total de dias disponibles' },
            { type: 'number', message: 'El valor debe ser un número' }
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePlanModal;