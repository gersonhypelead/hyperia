// src/components/CreateUserButton.tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import CreateTypeUserModal from './CreateTypeUserModal';

const CreateTypeUserButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Crear Tipo de Usuario
      </Button>
      <CreateTypeUserModal visible={isModalVisible} onClose={handleCloseModal} />
    </>
  );
};

export default CreateTypeUserButton;
