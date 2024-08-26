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
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [messages, setMessages] = useState<Message[]>([

  ]);
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

      let conversacion = [...messages];

      const messageEmit: Message = {
        id: messages.length + 1,
        text: messageSend,
        sender: sender,
      };
      conversacion.push(messageEmit);
      setMessages([...conversacion]);

      if (!modeBot) {
        const rpta_bot: any = await dispatch(CreateConversationReducer(messageSend));

        const messageRecived: Message = {
          id: messages.length + 2,
          text: rpta_bot.contenido,
          sender: 'receptor',
        };

        conversacion.push(messageRecived);
        setMessages([...conversacion]);
      } else {
        dispatch(CreateMessageTrainReducer(sender, idConversation, messageSend))
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
          borderRadius: '10px',
          position: 'relative',
          border: '1px solid #C4C4C4',
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
            background: '#03A9F4',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            marginBottom: '10px',
            color: 'white',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              marginRight: '20px',
            }}
          >
            <Avatar size={40} icon={<UserOutlined />} />
          </div>
          <div>
            <div
              style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '1' }}
            >
              {nombreChat}
            </div>
            <div>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              <span style={{ marginLeft: '5px' }}>Available</span>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: "20px"
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
                  dispatch(ResetConversationReducer())
                }}
              />
            </Tooltip>
          </div>
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
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
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