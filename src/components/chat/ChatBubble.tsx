import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, message as messageAntd } from 'antd';
import './ChatBubble.css';
import TextArea from 'antd/es/input/TextArea';
import { AppDispatch } from '../../redux/store/store';
import { useDispatch } from 'react-redux';
import { UploadMessagesTrainReducer, DeleteMessageTrainReducer } from '../../redux/actions/chatBots/Chat/Chat';
import { GetConversacionReducer } from '../../redux/actions/chatBots/Entrenar/ChatBots'

interface ChatBubbleProps {
  idConversation: number;
  idMessage: number;
  message: string;
  sender: 'emisor' | 'receptor';
  editBubble?: boolean;
  fontSize: string;
  fontFamily: string;
  colorTextoEmisor?: string;
  colorTextoReceptor?: string;
  onDeleteMessage: (idMessage: number) => void;
}

const { confirm } = Modal;

const ChatBubble: React.FC<ChatBubbleProps> = ({
  idConversation,
  idMessage,
  message,
  sender,
  editBubble = false,
  fontSize,
  fontFamily,
  colorTextoEmisor,
  colorTextoReceptor,
  onDeleteMessage,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [editMessage, setEditMessage] = useState(false);
  const [defaultMessage, setDefaultMessage] = useState(message);
  const [newMessage, setNewMessage] = useState(message);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleDeleteMessage = () => {
    confirm({
      title: '¿Estás seguro de que deseas eliminar este mensaje?',
      icon: <ExclamationCircleOutlined />,
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          // Check if message has a valid ID from backend
          if (idMessage > 1000000) {  // Adjust threshold as needed
            messageAntd.error('Mensaje aún no guardado, no se puede eliminar');
            return;
          }
          
          // Existing delete logic
          await dispatch(DeleteMessageTrainReducer(idConversation, idMessage));
          
          // Actualizar la lista de mensajes desde el servidor
          await dispatch(GetConversacionReducer(idConversation));
          
          // Llamar a la función onDeleteMessage para manejar la eliminación local
          onDeleteMessage(idMessage);
          
          messageAntd.success('Mensaje eliminado correctamente');
        } catch (error) {
          messageAntd.error('Error al eliminar el mensaje');
          console.error('Error:', error);
        }
      },
    });
  };
  


  return (
    <div
      className={`chat-bubble ${sender}`}
      style={{
        position: 'relative',
        color: sender === 'emisor' ? colorTextoEmisor : colorTextoReceptor,
      }}
    >
      <p style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily }}>
        {editMessage ? defaultMessage : message}
      </p>

      {/* Botón Editar */}
      {editBubble && (
        <div
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
                color: 'black',
                cursor: 'pointer',
              }
          }
          onClick={showModal}
        >
          <EditOutlined />
        </div>
      )}

      {/* Botón Eliminar */}
      {editBubble && (
        <div
          style={
            sender === 'receptor'
              ? {
                position: 'absolute',
                top: '9px',
                right: '-50px',
                cursor: 'pointer',
                color: 'red',
              }
              : {
                position: 'absolute',
                top: '9px',
                left: '-50px',
                color: 'red',
                cursor: 'pointer',
              }
          }
          onClick={handleDeleteMessage}
        >
          <DeleteOutlined />
        </div>
      )}

      {/* Modal de Edición */}
      <Modal
        title="Editar mensaje"
        open={open}
        onOk={async () => {
          await dispatch(UploadMessagesTrainReducer(sender, idConversation, newMessage, idMessage));
          await dispatch(GetConversacionReducer(idConversation));
          messageAntd.success('Mensaje editado correctamente');
          hideModal();
          setDefaultMessage(newMessage);
          setEditMessage(true);
        }}
        onCancel={hideModal}
        okText="Aceptar"
        cancelText="Cancelar"
      >
        <TextArea defaultValue={defaultMessage} onChange={(e) => setNewMessage(e.target.value)} />
      </Modal>

    </div>
  );
};

export default ChatBubble;
