import React, { useEffect, useRef, useState} from 'react';
import { Input, Avatar, Tooltip, Button,Skeleton } from 'antd';
import { CheckCircleTwoTone, SendOutlined, UserOutlined, RobotOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ChatBubble from './ChatBubble';
import { AppDispatch, RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { CreateConversationReducer, CreateMessageTrainReducer, ResetConversationReducer } from '../../redux/actions/chatBots/Chat/Chat';
import { ReloadOutlined } from '@ant-design/icons';
import { CreateConversationSupportReducer } from '../../redux/actions/chatBots/Chat/ChatSupport';
import {GetConversacionReducer } from '../../redux/actions/chatBots/Entrenar/ChatBots'; //
import { GetOneDesingChatReducer, GetOneDesingChatSupportReducer } from '../../redux/actions/chatBots/Chat/ChatDesing';
import { fetchChatbotHorarios } from '../../redux/actions/Horario/ChatBotHorario';
import { UpdateChatSeccionadoHome, UpdateSupportSeleccionadoHome } from '../../redux/actions/home/Home';
import { useParams } from 'react-router-dom';
import { CreateConversationEmbeddedReducer } from '../../redux/actions/embedded/Embedded';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es');
interface Message {
  id: number;
  text: string;
  sender: 'emisor' | 'receptor';
}
interface ChatProps {
  idConversation?: number;
  editBubble?: boolean;
  modeBot?: boolean;
  iaActivate?: boolean;
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
  }
  typingStatus?: boolean;
  idChatBot?: number;
  tokenChatbot?: string;
  disabledInput?: boolean;
  estadoHorario?: boolean;
}

const ChatComponent: React.FC<ChatProps> = ({

  idConversation = 0,
  editBubble = true,
  modeBot = false,
  iaActivate = true,
  data,
  fontSize = '16px',
  fontFamily = 'Arial',
  nombreChat = 'Nombre del chat',
  inputPlaceholder = 'Tipear un mensaje',
  logoChat = null,
  iconoEnviarChat = null,
  resetChat = true,
  supportChat = false,
  embedded = false,
  estadoChat,
  logoPreview = "",
  iconoPreview = "",
  coloresStyle = {
    colorCabecera: '#1677ff',
    colorTextoEmisor: '#FFFFFF',
    colorTextoReceptor: '#000000',
    colorTitulo: '#FFFFFF',
    colorEstado: '#0BF732'
  },
  typingStatus = false,
  idChatBot,
  tokenChatbot = "",
  disabledInput = false,
  estadoHorario
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { token } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isChatbotActive, setIsChatbotActive] = useState<boolean>(false);
  const {
    rex_data
  } = useSelector(({ chatsbotsHorario }: any) => chatsbotsHorario);

  const {
    rex_user_auth
  } = useSelector(({ auth }: any) => auth);

  const { estado_user } = rex_user_auth?.estado_user || {};
  const { rex_conversations } = useSelector((state: RootState) => state.conversation);

  const {
    rex_chatsbots
  } = useSelector(({ home }: any) => home);

  const { rex_state_update_desing, rex_design_chat, rex_design_status, rex_styles } = useSelector((state: RootState) => state.design);
  const { rex_chat_selecccionado } = useSelector(({ home }: RootState) => home);
  const selectedChatId = rex_chat_selecccionado
  const selectedChatbot = rex_chatsbots.find((bot: any) => bot.id === selectedChatId);

  useEffect(() => {
    if (selectedChatbot && rex_user_auth?.timezone) {
      updateChatbotStatus();
    }
  }, [selectedChatbot, rex_user_auth]);
  

  const [newMessage, setNewMessage] = useState<string>('');
  const [sender, setSender] = useState<'emisor' | 'receptor'>('emisor');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setMessagesLoading] = useState<boolean>(false);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteMessage = (idMessage: number) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== idMessage));
  };

  useEffect(() => {
    scrollToBottom();
    if (supportChat) {
      dispatch(GetOneDesingChatSupportReducer());
    } else {
      dispatch(GetOneDesingChatReducer());
    }
  }, []);

  useEffect(() => {
    if (data?.length) {
      setMessages(data);
    } else {
      setMessages([]);
    }
  }, [data]);

  useEffect(() => {
    dispatch(fetchChatbotHorarios());
  }, []);
///////
const handleSendMessage = async (messageSend: string) => {
  if (newMessage.trim()) {
    setNewMessage('');
    console.log('Mensaje enviado:', messageSend);
    setMessagesLoading(true);

    const tempMessageId = Date.now();
    const messageEmit: Message = {
      id: tempMessageId,
      text: messageSend,
      sender: 'emisor',
    };

    setMessages((prevMessages) => [...prevMessages, messageEmit]);
    scrollToBottom();

    try {
      if (!isChatbotActive) {
        const unavailableMessage: Message = {
          id: Date.now(),
          text: "El chatbot no está disponible en este horario.",
          sender: 'receptor',
        };
        setMessages((prevMessages) => [...prevMessages, unavailableMessage]);
        return;
      }
      console.log('Preparando envío de mensaje');

      if (modeBot) {
        await dispatch(CreateMessageTrainReducer('emisor', idConversation, messageSend));
      }

      setIsTyping(true); // Mostrar los tres puntos "escribiendo..."

      let response: any;
      if (embedded && token) {
        response = await dispatch(CreateConversationEmbeddedReducer(messageSend, token));
      } else if (supportChat) {
        response = await dispatch(CreateConversationSupportReducer(messageSend));
      } else {
        response = await dispatch(CreateConversationReducer(messageSend));
      }

      console.log('Respuesta recibida:', response);

      const botMessage = response?.contenido || 'Respuesta no disponible';
      setIsTyping(false); // Ocultar "escribiendo..."
      console.log('Mensaje del bot:', botMessage);

      // Simular efecto de escritura (typingEffect)
      let currentText = '';
      let index = 0;

      const typingInterval = setInterval(() => {
        if (index < botMessage.length) {
          currentText += botMessage.charAt(index);
          setDisplayedText(currentText); // Muestra el texto progresivamente
          index++;
        } else {
          clearInterval(typingInterval);

          // Añadir la respuesta del bot al estado `messages`
          const botResponse: Message = {
            id: Date.now(),
            text: botMessage,
            sender: 'receptor',
          };

          setMessages((prevMessages) => [...prevMessages, botResponse]); // Actualizar localmente
          setDisplayedText('');
          scrollToBottom();

          // Guardar en el backend si estamos en modo entrenamiento
          if (modeBot) {
            dispatch(CreateMessageTrainReducer('receptor', idConversation, botMessage));
          }

          // Retraso controlado antes de llamar a GetConversacionReducer
          setTimeout(() => {
            dispatch(GetConversacionReducer(idConversation)).then((updatedMessages: Message[]) => {
              console.log('Mensajes actualizados del backend:', updatedMessages);
              setMessages(updatedMessages); // Actualiza la lista completa desde el backend
            });
          }, 500); // Retraso de 500 ms para permitir que el backend guarde la respuesta
        }
      }, 50); // Efecto de escritura
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== tempMessageId)
      );
    } finally {
      setMessagesLoading(false);
    }
  }
};

/////
  
  const updateChatbotStatus = () => {
    const timezone = rex_user_auth.timezone;
    const currentDay = dayjs().tz(timezone).format('dddd').toLowerCase();
    const currentTime = dayjs().tz(timezone).format('HH:mm');
    const daySchedule = selectedChatbot?.horariosActividad?.find((schedule: any) => schedule.dia === currentDay);
    if (daySchedule) {
      const [startTime, endTime] = daySchedule.horario.split(' - ');
      if (currentTime >= startTime && currentTime <= endTime) {
        setIsChatbotActive(true);
      } else {
        setIsChatbotActive(false);
      }
    } else {
      setIsChatbotActive(false);
    }
  };
  const hasImage = logoPreview || logoChat;

  return (
    <>
      <div
        style={{
          height: '500px',
          borderRadius: '25px',
          position: 'relative',
          border: '1px solid #C4C4C4',
          boxShadow: ' 0 0px 8px rgba(12, 12, 12, 0.2)'
        }}
      >
        <div
          style={{
            display: 'flex',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '10px',
            paddingBottom: '10px',
            background: coloresStyle.colorCabecera,
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
            <Avatar
              size={40}
              src={logoPreview || (logoChat && logoChat !== "http://url" ? logoChat : undefined)}
              icon={logoChat === "http://url" ? <UserOutlined /> : undefined}
              style={{
                background: '#E6F4FF',
                color: "black",
                borderRadius: '100%',
                marginRight: '10px',
                width: '40px',
                height: '40px',
                alignContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            />

          </div>
          <div
            style={{
              background: 'transparent'
            }}
          >
            <div
              style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '1', background: 'transparent', color: coloresStyle.colorTitulo }}
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

              <CheckCircleTwoTone
                twoToneColor={coloresStyle.colorEstado}
              />
              <span></span>
              <span>
                <span
                  style={{
                    marginLeft: '5px',
                    fontWeight: 'bold',
                    color:
                      estadoHorario ? '#0BF732' : 'red'
                  }}
                >
                  {estadoHorario ? 'Activo' : 'Inactivo'}
                </span>
              </span>
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
                      dispatch(UpdateChatSeccionadoHome("0"))
                      //dispatch(UpdateSupportSeleccionadoHome("0"))
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
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    maxHeight: '400px',
    overflowY: 'auto',
    paddingBottom: '60px',
    margin: '0 2px',
    boxSizing: 'border-box',
  }}
>
  {/* Renderiza todos los mensajes */}
  {messages.map((message, index) => (
    <div
      key={message.id}
      style={{
        display: 'flex',
        justifyContent: message.sender === 'emisor' ? 'flex-end' : 'flex-start',
        marginBottom: '10px',
      }}
    >
      <ChatBubble
        idConversation={idConversation}
        idMessage={message.id}
        message={message.text}
        sender={message.sender}
        fontSize={fontSize}
        fontFamily={fontFamily}
        editBubble={editBubble}
        colorTextoEmisor={coloresStyle.colorTextoEmisor}
        colorTextoReceptor={coloresStyle.colorTextoReceptor}
        onDeleteMessage={handleDeleteMessage}
      />
    </div>
  ))}

  {/* Efecto de tres puntos escribiendo */}
  {isTyping && (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '10px',
        marginLeft: '10px',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '8px 12px',
        maxWidth: '150px',
      }}
    >
      <span className="dot" />
      <span className="dot" style={{ animationDelay: '0.2s' }} />
      <span className="dot" style={{ animationDelay: '0.4s' }} />
      <style>
        {`
          .dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            margin: 0 2px;
            background-color: #999;
            border-radius: 50%;
            animation: bounce 1.5s infinite ease-in-out;
          }

          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  )}

  {/* TypingEffect: Escribe la respuesta letra por letra */}
  {displayedText && (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '10px',
      }}
    >
      <ChatBubble
        idConversation={idConversation}
        idMessage={0}
        message={displayedText} // El texto mostrado letra por letra
        sender="receptor"
        fontSize={fontSize}
        fontFamily={fontFamily}
        editBubble={editBubble}
        colorTextoEmisor={coloresStyle.colorTextoEmisor}
        colorTextoReceptor={coloresStyle.colorTextoReceptor}
        onDeleteMessage={() => {}}
      />
    </div>
  )}
</div>


        <div
          style={{
            position: 'absolute',
            bottom: '0',
            background: 'white',
            width: '100%',
            height: '60px',
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
                marginRight: '0px',
                marginLeft: '10px',
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

          <Input
            style={{
              borderRadius: '20px',
              height: '40px',
              marginLeft: '10px',
              marginRight: '20px'
            }}
            type="text"
            value={newMessage}
            onChange={(e) => { setNewMessage(e.target.value); }}
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
                {iconoPreview ? (
                  <img
                    src={iconoPreview}
                    alt={iconoPreview}
                    style={{
                      marginTop: "8px",
                      background: "green",
                      borderColor: "black",
                      borderWidth: "2px",
                      width: '30px',
                      height: '30px',
                      borderStyle: "solid",
                      borderRadius: "8px",
                      objectFit: 'cover',

                    }}
                  />
                ) : (iconoEnviarChat == "http://url" ? (<SendOutlined />) : (
                  <img
                    src={iconoEnviarChat || ""}
                    alt={iconoEnviarChat || ""}
                    style={{
                      marginTop: "8px",
                      background: "green",
                      borderColor: "black",
                      borderWidth: "2px",
                      width: '30px',
                      height: '30px',
                      borderStyle: "solid",
                      borderRadius: "8px",
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </div>
            }
            disabled={disabledInput}
          />
        </div>
      </div >
    </>
  );
};

export default ChatComponent;