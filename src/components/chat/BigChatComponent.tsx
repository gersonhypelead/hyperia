import React, { useEffect, useRef, useState } from 'react';
import { Input, Avatar, Tooltip, Badge } from 'antd';
import {
  CheckCircleTwoTone,
  SendOutlined,
  UserOutlined,
  RobotOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import BigChatBubble from './BigChatBubble';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import {
  CreateConversationReducer,
  CreateMessageTrainReducer,
  ResetConversationReducer
} from '../../redux/actions/chatBots/Chat/Chat';
import { fetchChatbotHorarios } from '../../redux/actions/Horario/ChatBotHorario';
import { useParams } from 'react-router-dom';
import { CreateConversationEmbeddedReducer } from '../../redux/actions/embedded/Embedded';
import { GetChatSeccionadoHome, UpdateSupportSeleccionadoHome } from '../../redux/actions/home/Home';

interface Message {
  id: number;
  text: string;
  sender: 'emisor' | 'receptor';
}

interface BigChatProps {
  idConversation?: number;
  editBubble?: boolean;
  modeBot?: boolean;
  data?: Array<any>;
  fontSize?: string;
  fontFamily?: string;
  nombreChat?: string;
  inputPlaceholder?: string;
  logoChat?: string;
  iconoEnviarChat?: string;
  logoPreview?: string | null;
  iconoPreview?: string | null;
  resetChat?: boolean;
  supportChat?: boolean;
  embedded?: boolean;
  estadoChat?: boolean;
  coloresStyle?: {
    colorCabecera?: string;
    colorTextoEmisor?: string;
    colorTextoReceptor?: string;
    colorTitulo?: string;
    colorEstado?: string;
  };
  bordeRadio?: string;
  iconoTamano?: number;
  typingStatus?: boolean;
  unreadMessagesCount?: number;
}
const BigChatComponent: React.FC<BigChatProps> = ({
  idConversation = 0,
  editBubble = true,
  modeBot = false,
  data,
  fontSize = '16px',
  fontFamily = 'Arial',
  nombreChat = 'Nombre del chat',
  inputPlaceholder = 'Tipear un mensaje...',
  logoChat = null,
  iconoEnviarChat = null,
  logoPreview = "",
  iconoPreview = "",
  resetChat = true,
  supportChat = false,
  embedded = false,
  estadoChat,
  coloresStyle = {
    colorCabecera: '#1677ff',
    colorTextoEmisor: '#FFFFFF',
    colorTextoReceptor: '#000000',
    colorTitulo: '#FFFFFF',
    colorEstado: '#0BF732',
  },
  bordeRadio = '0px',
  iconoTamano = 40,
  typingStatus = false,
  unreadMessagesCount = 0
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { token } = useParams();
  const { userid } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [sender, setSender] = useState<'emisor' | 'receptor'>('emisor');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false); // Estado para controlar el "escribiendo..."
  const [displayedText, setDisplayedText] = useState<string>(''); // Para mostrar el texto que se va escribiendo
  const { rex_chat_selecccionado } = useSelector(({ home }: RootState) => home);
  const { rex_user_auth } = useSelector((state: RootState) => state.auth);
  const selectedChatId = rex_chat_selecccionado

  useEffect(() => {
    dispatch(fetchChatbotHorarios());
  }, []);

  useEffect(() => {
    if (data?.length) {
      setMessages(data);
    } else {
      setMessages([]);
    }
  }, [data]);

  const handleSendMessage = async (messageSend: string) => {
    if (newMessage.trim()) {
      setNewMessage('');

      const messageEmit: Message = {
        id: messages.length + 1,
        text: messageSend,
        sender: 'emisor',
      };
      setMessages((prevMessages) => [...prevMessages, messageEmit]);
      scrollToBottom();

      if (!modeBot) {
        setIsTyping(true);

        const rpta_bot: any = embedded
          ? token
            ? await dispatch(CreateConversationEmbeddedReducer(messageSend,token))
            : 0

          : supportChat
            ? await dispatch(CreateConversationReducer(messageSend))
            : await dispatch(CreateConversationReducer(messageSend));

        setIsTyping(false);

        // Lógica para mostrar la respuesta del bot letra por letra
        const botMessage = rpta_bot.contenido;
        let currentText = ''; // Texto que se va mostrando
        let index = 0;

        const typingEffect = () => {
          if (index < botMessage.length) {
            currentText += botMessage.charAt(index);
            setDisplayedText(currentText); // Actualiza el texto mostrado
            index++;
            setTimeout(typingEffect, 50); // Intervalo para mostrar cada letra (50ms)
          } else {
            const messageRecived: Message = {
              id: messages.length + 2,
              text: botMessage,
              sender: 'receptor',
            };
            setMessages((prevMessages) => [...prevMessages, messageRecived]);
            setDisplayedText(''); // Limpiamos el texto mostrado cuando se termina de escribir
          }
        };

        typingEffect();
        scrollToBottom();
      } else {
        dispatch(CreateMessageTrainReducer(sender, idConversation, messageSend));
        setSender(sender === 'emisor' ? 'receptor' : 'emisor');
      }
    }
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        borderRadius: bordeRadio,
        position: 'fixed',
        top: 0,
        left: 0,
        border: '1px solid #C4C4C4',
        boxShadow: '0 0px 8px rgba(12, 12, 12, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'white'
      }}
    >
      {/* HEAD */}
      <div
        style={{
          display: 'flex',
          padding: '10px 20px',
          background: coloresStyle.colorCabecera,
          borderTopLeftRadius: bordeRadio,
          borderTopRightRadius: bordeRadio,
          color: 'white',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <Badge count={unreadMessagesCount} offset={[10, 0]}>
          <Avatar
            size={iconoTamano}
            src={logoPreview || logoChat}
            icon={!logoChat ? <UserOutlined /> : undefined}
            style={{
              marginRight: '20px',
              background: 'gray',
              border: '2px solid black',
            }}
          />
        </Badge>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: '18px', color: coloresStyle.colorTitulo }}>
            {nombreChat}
          </div>
          <div style={{ color: coloresStyle.colorEstado, marginTop: '4px', display: 'flex', alignItems: 'center' }}>
            <CheckCircleTwoTone twoToneColor={coloresStyle.colorEstado} />
            <span style={{ marginLeft: '5px', fontSize: '14px' }}>
              {rex_user_auth?.estado ? 'Disponible' : 'Inactivo'}
            </span>
          </div>
        </div>
        {resetChat && (
          <Tooltip title="Nuevo Chat">
            <ReloadOutlined
              style={{
                fontSize: '20px',
                cursor: 'pointer'
              }}
              onClick={() => {
                dispatch(UpdateSupportSeleccionadoHome("0"))
                dispatch(UpdateSupportSeleccionadoHome('0'))
                dispatch(ResetConversationReducer());
              }}
            />
          </Tooltip>
        )}
      </div>

      {/* BODY */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
        {messages.map((message) => (
          <BigChatBubble
            key={message.id}
            idConversation={idConversation}
            message={message.text}
            sender={message.sender}
            fontSize={fontSize}
            fontFamily={fontFamily}
            editBubble={editBubble}
            colorTextoEmisor={coloresStyle.colorTextoEmisor}
            colorTextoReceptor={coloresStyle.colorTextoReceptor}
          />
        ))}

        {/* Mostrar "escribiendo..." si el bot está cargando */}
        {isTyping && <div style={{ fontStyle: 'italic', color: '#999' }}>Escribiendo...</div>}

        {/* Mostrar el texto letra por letra del bot */}
        {displayedText && (
          <BigChatBubble
            idConversation={idConversation}
            message={displayedText}
            sender="receptor"
            fontSize={fontSize}
            fontFamily={fontFamily}
            editBubble={editBubble}
            colorTextoEmisor={coloresStyle.colorTextoEmisor}
            colorTextoReceptor={coloresStyle.colorTextoReceptor}
          />
        )}

        <div ref={messagesEndRef} />
        {typingStatus && <div style={{ fontStyle: 'italic', color: '#999' }}>El usuario está escribiendo...</div>}
      </div>

      {/* FOOTER */}
      <div
        style={{
          padding: '10px 20px',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          borderBottomLeftRadius: bordeRadio,
          borderBottomRightRadius: bordeRadio,
          boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
          marginTop: '10px'
        }}
      >
        {modeBot && (
          <div
            style={{
              background: '#E6F4FF',
              borderRadius: '100%',
              marginRight: '10px',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setSender(sender === 'emisor' ? 'receptor' : 'emisor')}
          >
            {sender === 'emisor' ? <UserOutlined /> : <RobotOutlined />}
          </div>
        )}
        <Input
          style={{ borderRadius: '20px', height: '40px', flex: 1 }}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={inputPlaceholder}
          onKeyDown={(event) => event.key === 'Enter' && handleSendMessage(newMessage)}
          suffix={
            <div
              onClick={() => handleSendMessage(newMessage)}
              style={{ cursor: 'pointer' }}
            >
              {iconoPreview ? (
                <img
                  src={iconoPreview}
                  alt="icon preview"
                  style={{
                    background: 'green',
                    border: '2px solid black',
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                  }}
                />
              ) : (
                <SendOutlined />
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default BigChatComponent;
