// src/components/CreateUserButton.tsx
import React, { useState } from 'react';
import { Button } from 'antd';
import CreateUserModal from './CreateUserModal';
const CreateUserButton: React.FC = () => {
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
        Crear Usuario
      </Button>
      <CreateUserModal visible={isModalVisible} onClose={handleCloseModal} />
    </>
  );
};

export default CreateUserButton;
