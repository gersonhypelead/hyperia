import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { findAuditoriaTableUser } from '../../../../redux/actions/auditorias/auditoriasActions';
import { RootState, AppDispatch } from '../../../../redux/store/store';

interface AuditoriaUsuariosProps {
  visible: boolean;
  onClose: () => void;
  userId: number;
}

const AuditoriaUsuarios: React.FC<AuditoriaUsuariosProps> = ({ visible, onClose, userId }) => {
  const dispatch: AppDispatch = useDispatch();
  const { auditorias, loading, error } = useSelector((state: RootState) => state.auditorias);

  const [jsonModalVisible, setJsonModalVisible] = useState(false);  // Estado para manejar la visibilidad del modal
  const [selectedJson, setSelectedJson] = useState<string | null>(null);  // Estado para manejar el JSON seleccionado

  useEffect(() => {
    if (visible) {
      dispatch(findAuditoriaTableUser('usuario', userId));
    }
  }, [dispatch, visible, userId]);

  // Filtrar auditorías relacionadas con el userId
  const userAudits = auditorias.filter(audit => audit.pk_actualizado === userId);


  const handleOpenJsonModal = (json: string) => {
    setSelectedJson(json);
    setJsonModalVisible(true);
  };

  const handleCloseJsonModal = () => {
    setJsonModalVisible(false);
    setSelectedJson(null);
  };


  const columns = [
    {
      title: 'Acción',
      dataIndex: 'accion',
      key: 'accion',
    },
    {
      title: 'Fecha de Creación',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => new Date(createdAt).toLocaleString(),
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
        title: 'Entrada JSON',
        dataIndex: 'jsonentrada',
        key: 'jsonentrada',
        render: (jsonentrada: string) => (
          <Button type="primary" onClick={() => handleOpenJsonModal(jsonentrada)}>
            Ver Entrada JSON
          </Button>
        ),
      },
      {
        title: 'Salida JSON',
        dataIndex: 'jsonsalida',
        key: 'jsonsalida',
        render: (jsonsalida: string) => (
          <Button type="primary" onClick={() => handleOpenJsonModal(jsonsalida)}>
            Ver Salida JSON
          </Button>
        ),
      },
    {
      title: 'Actualizado en',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: string) => new Date(updatedAt).toLocaleString(),
    },
    {
      title: 'Usuario',
      dataIndex: ['usuarios', 'usuario'],
      key: 'usuario',
    },
  ];

  return (
   
     <Modal
        title="Auditorias Usuarios"
        visible={visible}
        onCancel={onClose}
        footer={null}
        width={2000}
     >
        <Table
          dataSource={userAudits}
          columns={columns}
          rowKey="id" // Asegúrate de tener un campo único como `id` en tus datos
          pagination={{ pageSize: 10 }} // Control de paginación, 10 filas por página
        />
        <Modal
        title="Detalle del JSON"
        visible={jsonModalVisible}
        onCancel={handleCloseJsonModal}
        footer={null}
        width={800}
      >
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {selectedJson && JSON.stringify(JSON.parse(selectedJson), null, 2)}
        </pre>
        </Modal>
    
    </Modal>
  );
};

export default AuditoriaUsuarios;
