import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Spin, message, Collapse, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { findAuditoriaTableUser } from '../../../../redux/actions/auditorias/auditoriasActions';
import { RootState, AppDispatch } from '../../../../redux/store/store';

interface AuditoriaModalProps {
  visible: boolean;
  onClose: () => void;
  userId: number; // Asegúrate de que `userId` sea un número
}

const AuditoriaModal: React.FC<AuditoriaModalProps> = ({ visible, onClose, userId }) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [jsonEntradaModalVisible, setJsonEntradaModalVisible] = useState<boolean>(false);
  const [jsonSalidaModalVisible, setJsonSalidaModalVisible] = useState<boolean>(false);
  
  const { auditorias, loading, error } = useSelector((state: RootState) => state.auditorias);

  useEffect(() => {
    if (visible) {
      dispatch(findAuditoriaTableUser('tipousuarios', userId));
    }
  }, [dispatch, visible, userId]);

  // Filtrar auditorías relacionadas con el usuarioId
  const userAudits = auditorias.filter(audit => audit.pk_actualizado === userId);

  const handleJsonEntradaModalOpen = (audit: any) => {
    setSelectedAudit(audit);
    setJsonEntradaModalVisible(true);
  };

  const handleJsonSalidaModalOpen = (audit: any) => {
    setSelectedAudit(audit);
    setJsonSalidaModalVisible(true);
  };

  const handleJsonModalClose = () => {
    setJsonEntradaModalVisible(false);
    setJsonSalidaModalVisible(false);
    setSelectedAudit(null);
  };

  const parseJson = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return {}; // Devuelve un objeto vacío en caso de error
    }
  };

  const renderJsonFields = (jsonString: string) => {
    const jsonObject = parseJson(jsonString);
    return Object.entries(jsonObject).map(([key, value]) => (
      <Form.Item key={key} label={key}>
        <Input disabled value={typeof value === 'string' ? value : JSON.stringify(value)} />
      </Form.Item>
    ));
  };

  return (
    <>
      <Modal
        title="Ver Auditorías"
        visible={visible}
        onCancel={onClose}
        footer={null} // No mostramos el pie del modal ya que no hay acción de guardar
      >
        {loading ? (
          <Spin /> // Muestra un spinner mientras se carga la información
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p> // Muestra el error si hay
        ) : (
          <div>
            {userAudits.length > 0 ? (
              <Collapse>
                {userAudits.map((audit, index) => (
                  <Collapse.Panel header={`Auditoría ${index + 1}`} key={audit.id}>
                    <Form form={form} layout="vertical">
                      <Form.Item label="Acción">
                        <Input disabled value={audit.accion} />
                      </Form.Item>

                      <Form.Item label="Fecha de Creación">
                        <Input disabled value={new Date(audit.createdAt).toLocaleString()} />
                      </Form.Item>

                      <Form.Item label="Descripción">
                        <Input disabled value={audit.descripcion} />
                      </Form.Item>

                      <Form.Item label="IP">
                        <Input disabled value={audit.ip} />
                      </Form.Item>

                      <Form.Item label="Entrada JSON">
                        <Button onClick={() => handleJsonEntradaModalOpen(audit)}>
                          Ver Entrada JSON
                        </Button>
                      </Form.Item>

                      <Form.Item label="Salida JSON">
                        <Button onClick={() => handleJsonSalidaModalOpen(audit)}>
                          Ver Salida JSON
                        </Button>
                      </Form.Item>

                      <Form.Item label="Actualizado en">
                        <Input disabled value={new Date(audit.updatedAt).toLocaleString()} />
                      </Form.Item>

                      <Form.Item label="Usuario">
                        <Input disabled value={audit.usuarios?.usuario} />
                      </Form.Item>
                    </Form>
                  </Collapse.Panel>
                ))}
              </Collapse>
            ) : (
              <p>No hay auditorías para mostrar.</p>
            )}
          </div>
        )}
      </Modal>

      {/* Modal para mostrar el JSON de Entrada */}
      <Modal
        title="Detalles de Entrada JSON"
        visible={jsonEntradaModalVisible}
        onCancel={handleJsonModalClose}
        footer={null} // No mostramos el pie del modal
      >
        {selectedAudit && (
          <div>
            <Form layout="vertical">
              {renderJsonFields(selectedAudit.jsonentrada)}
            </Form>
          </div>
        )}
      </Modal>

      {/* Modal para mostrar el JSON de Salida */}
      <Modal
        title="Detalles de Salida JSON"
        visible={jsonSalidaModalVisible}
        onCancel={handleJsonModalClose}
        footer={null} // No mostramos el pie del modal
      >
        {selectedAudit && (
          <div>
            <Form layout="vertical">
              {renderJsonFields(selectedAudit.jsonsalida)}
            </Form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AuditoriaModal;
