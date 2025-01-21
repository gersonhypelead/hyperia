// src/components/CreateUserButton.tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import CreatePlanModal from './CreatePlanesModal';
const CreatePlanesButton: React.FC = () => {
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
        Crear Plan
      </Button>
      <CreatePlanModal visible={isModalVisible} onClose={handleCloseModal} />
    </>
  );
};

export default CreatePlanesButton;
