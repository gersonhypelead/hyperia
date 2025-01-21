// src/components/CreateUserButton.tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import CreatePaquetesMensajesModal from './CreatePaquetesMensajesModal';
const CreatePaquetesMensajesButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className="boton-crear">
        Crear Paquete de Mensajes
      </Button>
      <CreatePaquetesMensajesModal visible={isModalVisible} onClose={handleCloseModal} />
    </>
  );
};

export default CreatePaquetesMensajesButton;
