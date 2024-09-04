import React, { useEffect, useRef, useState } from 'react';
import { Input, Avatar, Tooltip } from 'antd';
import {
  CheckCircleTwoTone,
  SendOutlined,
  UserOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import ChatBubble from './ChatBubble';
import { AppDispatch } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { CreateConversationReducer, CreateMessageTrainReducer, ResetConversationReducer } from '../../redux/actions/chatBots/Chat/Chat';
import {
  ReloadOutlined
} from '@ant-design/icons';
import { CreateConversationSupportReducer } from '../../redux/actions/chatBots/Chat/ChatSupport';


interface Message {
  id: number;
  text: string;
  sender: 'emisor' | 'receptor';
}

interface ChatProps {
  idConversation?: number;
  editBubble?: boolean;
  modeBot?: boolean;
  data?: Array<any>;
  fontSize?: string;
  fontFamily?: string;
  nombreChat?: string;
  inputPlaceholder?: string;
  logoChat?: string;
  resetChat?: boolean;
  supportChat?: boolean;
}

const ChatComponent: React.FC<ChatProps> = ({

  idConversation = 0,
  editBubble = true,
  modeBot = false,
  data,
  fontSize = '16px',
  fontFamily = 'Arial',
  nombreChat = 'Nombre del chat',
  inputPlaceholder = 'Tipear un mensaje',
  logoChat,
  resetChat = true,
  supportChat = false
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [messages, setMessages] = useState<Message[]>([

  ]);

  const {
    rex_chatsbots
  } = useSelector(({ home }: any) => home);

  const selectedChatId = Number(localStorage.getItem('chat_seleccionado'));

  const selectedChatbot = rex_chatsbots.find((bot: any) => bot.id === selectedChatId);

  useEffect(() => {
    // console.log('Selected Chatbot Data:', selectedChatbot);
  }, [selectedChatbot]);

  const [newMessage, setNewMessage] = useState<string>('');
  const [sender, setSender] = useState<'emisor' | 'receptor'>('emisor');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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

      const currentHour = new Date();

      // Obtener el rango de horario del chatbot seleccionado
      const horarioActividad = selectedChatbot?.horarioActividad || '';
      const [startHour, endHour] = horarioActividad.split(' - ');

      // Convertir las horas a Date objects para comparación
      const today = new Date();
      const startDateTime = new Date(today.toDateString() + ' ' + startHour);
      const endDateTime = new Date(today.toDateString() + ' ' + endHour);

      // Verificar si la hora actual está dentro del rango de horario
      if (currentHour >= startDateTime && currentHour <= endDateTime) {
        const messageRecived: Message = {
          id: messages.length + 1,
          text: 'Disponible',
          sender: 'receptor',
        };

        let conversacion = [...messages, messageRecived];
        setMessages([...conversacion]);
      } else {
        const messageRecived: Message = {
          id: messages.length + 1,
          text: 'No disponible',
          sender: 'receptor',
        };

        let conversacion = [...messages, messageRecived];
        setMessages([...conversacion]);
        return;
      }

      let conversacion = [...messages];

      const messageEmit: Message = {
        id: messages.length + 1,
        text: messageSend,
        sender: sender,
      };
      conversacion.push(messageEmit);
      setMessages([...conversacion]);

      if (!modeBot) {
        const rpta_bot: any = supportChat
          ? await dispatch(CreateConversationSupportReducer(messageSend))
          : await dispatch(CreateConversationReducer(messageSend));

        const messageRecived: Message = {
          id: messages.length + 2,
          text: rpta_bot.contenido,
          sender: 'receptor',
        };

        conversacion.push(messageRecived);
        setMessages([...conversacion]);
      } else {
        dispatch(CreateMessageTrainReducer(sender, idConversation, messageSend));
        setSender(sender === 'emisor' ? 'receptor' : 'emisor');
      }
    }
  };


  return (
    <>
      <div
        style={{
          width: '95%',
          height: '500px',
          // background: 'red',
          borderRadius: '25px',
          position: 'relative',
          border: '1px solid #C4C4C4',
          boxShadow: ' 0 0px 8px rgba(12, 12, 12, 0.2)'
        }}
      >
        {/* HEAD */}
        <div
          style={{
            display: 'flex',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '10px',
            paddingBottom: '10px',
            background: 'linear-gradient(137deg, rgba(34, 242, 255, 1)  0%, rgba(0, 255, 194, 1) 100%)',
            borderTopLeftRadius: '25px',
            borderTopRightRadius: '25px',
            marginBottom: '10px',
            color: 'white',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              marginRight: '20px',
              background: 'transparent'
            }}
          >
            <Avatar size={40} icon={<UserOutlined />} />
          </div>
          <div
            style={{
              background: 'transparent'
            }}
          >
            <div
              style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '1', background: 'transparent', color: ' #0C5257' }}
            >
              {nombreChat}
            </div>
            <div
              style={{
                background: 'transparent',
                marginTop: '4px',
                color: ' #0C5257'
              }}
            >
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              <span style={{ marginLeft: '5px' }}>Disponible2</span>
            </div>
          </div>
          {
            resetChat ? (
              <div
                style={{
                  position: "absolute",
                  right: "20px",
                  background: 'transparent',
                  color: ' #0C5257'
                }}
              >
                <Tooltip
                  title="Nuevo Chat"
                >
                  <ReloadOutlined
                    style={{
                      fontSize: '20px',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      localStorage.removeItem('TAB_CHAT_CONVERSACION_ID');
                      localStorage.removeItem('SUPPORT_CONVERSACION_ID');
                      dispatch(ResetConversationReducer())
                    }}
                  />
                </Tooltip>
              </div>
            ) : null
          }

        </div>

        {/* BODY */}
        <div
          style={{
            width: '100%',
            margin: '0 auto',
            height: '400px',
            overflowY: 'scroll',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                sender={message.sender}
                editBubble={editBubble}
                fontSize={fontSize}
                fontFamily={fontFamily}
                idConversation={idConversation}
              />
            ))}
            <div style={{ height: '20px' }} />
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* BOTTOM */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            background: 'white',
            width: '100%',
            height: '60px',
            paddingLeft: '20px',
            paddingRight: '20px',
            alignContent: 'center',
            display: 'flex',
            alignItems: 'center',
            borderBottomLeftRadius: '25px',
            borderBottomRightRadius: '25px',
          }}
        >
          {modeBot ? (
            <div
              style={{
                background: '#E6F4FF',
                borderRadius: '100%',
                marginRight: '10px',
                width: '40px',
                height: '40px',
                alignContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSender(sender === 'emisor' ? 'receptor' : 'emisor');
              }}
            >
              {sender == 'emisor' ? <UserOutlined /> : <RobotOutlined />}
            </div>
          ) : null}

          {/* BOTON DE ENVIAR */}
          <Input
            style={{
              borderRadius: '20px',
              height: '40px',
            }}
            type="text"
            value={newMessage}
            onChange={(e) => { setNewMessage(e.target.value); console.log(e.target.value, "valor --") }}
            placeholder={inputPlaceholder}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSendMessage(newMessage)
              }
            }}
            suffix={
              <div
                style={{
                  borderRadius: '100%',
                  cursor: 'pointer',
                }}
                onClick={() => handleSendMessage(newMessage)}
              >
                <SendOutlined />
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};

export default ChatComponent;