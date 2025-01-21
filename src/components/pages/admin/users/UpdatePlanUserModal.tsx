import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FetchPlanesReducer } from '../../../../redux/actions/planes/planesActions';
import { FetchUsuariosReducer, UpdatePlanUserReducer } from '../../../../redux/actions/users/usuariosActions';
import { AppDispatch, RootState } from '../../../../redux/store/store';

interface Plan {
  id: number;
  plan: string;
}

interface UpdatePlanModalProps {
  visible: boolean;
  onClose: () => void;
  userData: {
    id: number;
    plan: string;
    plan_id: number;
  };
}

interface PlanesState {
  rex_planes: Plan[];
  rex_meta: {
    page: number;
    limit: number;
  };
  rex_sortColumn: string;
  rex_sortOrder: string;
}

const { Option } = Select;

const UpdatePlanModal: React.FC<UpdatePlanModalProps> = ({ visible, onClose, userData }) => {
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { 
    rex_planes,
    rex_meta, 
    rex_sortColumn, 
    rex_sortOrder 
  } = useSelector((state: RootState) => state.planes as PlanesState);

  useEffect(() => {
    dispatch(FetchPlanesReducer(
      rex_meta?.page || 1,
      rex_meta?.limit || 10,
      rex_sortColumn,
      rex_sortOrder
    ));
  }, []);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        plan_id: userData.plan_id,
      });
    }
  }, [userData, form]);

  const handleSubmit = async (values: { plan_id: number }) => {
    if (!userData) return;
    setLoading(true);
    try {
      await dispatch(UpdatePlanUserReducer({
        plan_id: Number(values.plan_id),
        usuario_id: userData.id,
      }));
      message.success('Plan actualizado correctamente');
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
      title="Actualizar Plan"
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="plan_id"
          label="Elige el Plan"
          rules={[{ required: true, message: 'Por favor seleccione un plan' }]}
        >
          <Select placeholder="Seleccione un plan">
            {rex_planes && rex_planes.map((plan: Plan) => (
              <Option key={plan.id} >
                {plan.plan}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Actualizar Plan
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePlanModal;