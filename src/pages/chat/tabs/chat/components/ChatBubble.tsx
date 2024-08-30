import React, { useState } from 'react';
import {
  EditOutlined
} from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import '../style/ChatBubble.css';
import TextArea from 'antd/es/input/TextArea';

interface ChatBubbleProps {
  message: string;
  sender: 'emisor' | 'receptor';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <div className={`chat-bubble ${sender}`} style={{ position: 'relative' }}>
      <p>{message}</p>
      <div
        style={
          sender == 'receptor'
            ? {
              position: 'absolute',
              top: '9px',
              right: '-20px',
              cursor: 'pointer'
            } : {
              position: 'absolute',
              top: '9px',
              left: '-22px',
              color: 'black',
              cursor: 'pointer'
            }
        }
        onClick={showModal}
      >
        <EditOutlined />
      </div>
      <Modal
        title="Editar mensaje"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Aceptar"
        cancelText="Cancelar"
      >
        <TextArea defaultValue={message} />
      </Modal>
    </div>
  );
};

export default ChatBubble;
