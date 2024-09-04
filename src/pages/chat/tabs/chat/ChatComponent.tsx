import React, { useEffect, useRef, useState } from 'react';
import { Collapse, Space, Col, Row, Input, Avatar } from 'antd';
import {
  CheckCircleTwoTone,
  SendOutlined,
  UserOutlined,
  RobotOutlined
} from '@ant-design/icons';
import ChatBubble from './components/ChatBubble';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

interface Message {
  id: number;
  text: string;
  sender: 'emisor' | 'receptor';
}

const ChatComponent: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hola, ¿cómo estás?", sender: 'receptor' },
    { id: 2, text: "Estoy bien, ¿y tú?", sender: 'emisor' },
    { id: 3, text: "También estoy bien, gracias por preguntar.", sender: 'receptor' }
  ]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [sender, setSender] = useState<'emisor' | 'receptor'>('emisor');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObject: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender
      };
      setMessages([...messages, newMessageObject]);
      setNewMessage('');
      setSender(sender === 'emisor' ? 'receptor' : 'emisor');
    }
  };

  return (
    <>

      <Row>
        <Col md={12} xl={12}>
          <div className='contenedor-chat'
            style={{
              width: '95%',
              height: '600px',
              // background: 'red',
              borderRadius: '25px',
              position: 'relative',
              border: '1px solid #C4C4C4'
            }}
          >
            {/* HEAD */}
            <div className='header-chat'
            >
              <div
                style={{
                  marginRight: '20px'
                }}
              >
                <Avatar size={64} icon={<UserOutlined />} />
                <p>------------------------¿¿¿¿</p>
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '1' }}>
                  Vezzos Academy Support
                </div>
                <div>
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                  <span style={{ marginLeft: '5px' }}>Available</span>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div
              style={{
                width: '100%', margin: '0 auto',
                height: '500px', overflowY: 'scroll'
              }}
            >
              <div
                style={{
                  display: 'flex', flexDirection: 'column',

                }}
              >
                {messages.map(message => (
                  <>
                    <ChatBubble key={message.id} message={message.text} sender={message.sender} />
                  </>
                ))}
                <div style={{ height: '20px' }} />
                <div ref={messagesEndRef} />
              </div>
            </div>

            <p>----AAA-------¿¿¿¿</p>
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
                borderBottomRightRadius: '20px'
              }}
            >
              <div
                style={{
                  background: '#E6F4FF',
                  borderRadius: '100%',
                  marginRight: '10px',
                  width: '40px',
                  height: '40px',
                  alignContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSender(sender === 'emisor' ? 'receptor' : 'emisor');
                }}
              >
                {
                  sender == 'emisor'
                    ? <UserOutlined />
                    : <RobotOutlined />
                }

              </div>
              <Input
                style={{
                  borderRadius: '20px',
                  height: '40px'
                }}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder='Type a message'
                suffix={
                  <div
                    style={{
                      borderRadius: '100%',
                      cursor: 'pointer'
                    }}
                    onClick={handleSendMessage}
                  >
                    <SendOutlined />
                  </div>
                }
              />
            </div>

          </div>
        </Col>
        
        <Col md={12} xl={12}>
          <Space direction="vertical">
            <Collapse
              collapsible="header"
              defaultActiveKey={['1']}
              items={[
                {
                  key: '1',
                  label: 'Thdsais panel can only be collapsed by clicking text',
                  children: <p>{text}</p>,
                },
              ]}
            />
            <Collapse
              collapsible="icon"
              defaultActiveKey={['1']}
              items={[
                {
                  key: '1',
                  label: 'This ',
                  children: <p>{text}</p>,
                },
              ]}
            />
            <Collapse
              collapsible="disabled"
              items={[
                {
                  key: '1',
                  label: "This panel can't be collapsed",
                  children: <p>{text}</p>,
                },
              ]}
            />
          </Space>
        </Col>
        <p>------------------------¿¿¿¿</p>
      </Row>
    </>
  );
};

export default ChatComponent;
