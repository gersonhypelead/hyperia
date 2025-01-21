// src/components/PlanesUsuariosTable.tsx
import React from 'react';
import { Button, Modal, Table } from 'antd';

interface Paquete{
    id: number;
    paquete_mensaje_id: number;
    nombrePaquete: string;
    usuario_id: number;
    plan_id: number;
    total_mensaje_asignado: number;
    total_mensaje_disponible: number;
    anterior_mensaje_enviado: number;
    anterior_mensaje_recibido: number;
    createdAt: Date;
    updatedAt: Date;
    plan: string;
    usuario: string;
  }
  
  interface PlanesUsuariosTableProps {
    visible: boolean;
    onClose: () => void;
    userData: Paquete[]; // Cambia esto a un array de objetos
  }



  const PlanesUsuariosTable: React.FC<PlanesUsuariosTableProps> = ({ userData, visible, onClose }) => {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Paquete Mensaje',
        dataIndex: 'nombrePaquete',
        key: 'nombrePaquete',
      },
      {
        title: 'Usuario',
        dataIndex: 'usuario',
        key: 'usuario',
      },
      {
        title: 'Plan',
        dataIndex: 'plan',
        key: 'plan',
      },
      {
        title: 'Total Mensaje Asignado',
        dataIndex: 'total_mensaje_asignado',
        key: 'total_mensaje_asignado',
      },
      {
        title: 'Total Mensaje Disponible',
        dataIndex: 'total_mensaje_disponible',
        key: 'total_mensaje_disponible',
      },
      {
        title: 'Mensajes Enviados Anteriores',
        dataIndex: 'anterior_mensaje_enviado',
        key: 'anterior_mensaje_enviado',
      },
      {
        title: 'Mensajes Recibidos Anteriores',
        dataIndex: 'anterior_mensaje_recibido',
        key: 'anterior_mensaje_recibido',
      },
      {
        title: 'Creado En',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text: Date) => new Date(text).toLocaleString(), // Formato de fecha legible
      },
      {
        title: 'Actualizado En',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (text: Date) => new Date(text).toLocaleString(), // Formato de fecha legible
      },
    ];

  const handlePrintUserData = () => {
  };

  return (
    
    <Modal
      title="Planes de Usuarios"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={2000} // Puedes ajustar el ancho según tus necesidades
    >
        <Button type="primary" onClick={handlePrintUserData}>
        Imprimir UserData
      </Button>
      <Table 
      dataSource={userData} 
      columns={columns}/>
    </Modal>
    
  );
};

export default PlanesUsuariosTable;
