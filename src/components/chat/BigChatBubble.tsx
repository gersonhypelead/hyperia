import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import './BigChatBubble.css';
import TextArea from 'antd/es/input/TextArea';

interface BigChatBubbleProps {
  idConversation: number;
  message: string;
  sender: 'emisor' | 'receptor';
  editBubble?: boolean;
  fontSize: string;
  fontFamily: string;
  colorTextoEmisor?: string;
  colorTextoReceptor?: string;
}

const BigChatBubble: React.FC<BigChatBubbleProps> = ({
  idConversation,
  message,
  sender,
  editBubble = false,
  fontSize,
  fontFamily,
  colorTextoEmisor,
  colorTextoReceptor,
}) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <div 
      className={`big-chat-bubble ${sender}`} 
      style={{ 
        position: 'relative', 
        fontSize: `${fontSize}px`, 
        fontFamily: fontFamily, 
        color: sender === 'emisor' ? colorTextoEmisor : colorTextoReceptor 
      }}
    >
      <p>{message}</p>
      
      {editBubble ? (
        <div
          //className="edit-icon"
          style={
            sender === 'receptor'
              ? {
                  position: 'absolute',
                  top: '9px',
                  right: '-20px',
                  cursor: 'pointer',
                }
              : {
                  position: 'absolute',
                  top: '9px',
                  left: '-22px',
                  cursor: 'pointer',
                }
          }
          onClick={showModal}
        >
          {/* <EditOutlined /> */}
        </div>
      ) : null}

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

export default BigChatBubble;
