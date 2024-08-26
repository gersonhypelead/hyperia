import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Skeleton } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ChatComponent from '../../../../components/chat/ChatComponent';
import { GetDataConversationsReducer } from '../../../../redux/actions/chatBots/conversation/Conversation';
import { RootState } from '../../../../redux/store/store';
import { AppDispatch } from '../../../../redux/store/store';
import NoAccess from '../../../../components/pages/chat/NoAccess';
import { GetConversationReducer } from '../../../../redux/actions/chatBots/Chat/Chat';

const TabConversations: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Usar AppDispatch aquí
  const { rex_conversations, rex_loading, rex_error } = useSelector((state: RootState) => state.conversation);

  const [chatData, setChatData] = useState<any>(null);
  const [listConversationsData, setListConversationsData] = useState<any[]>([]);

  useEffect(() => {
    dispatch(GetDataConversationsReducer());
  }, []);

  useEffect(() => {
    if (rex_conversations.length > 0) {
      setChatData(rex_conversations[0]);
      setListConversationsData(rex_conversations);
    }
  }, [rex_conversations]);

  const handleRemove = (index: number) => {
    const newList = listConversationsData.filter((_, i) => i !== index);
    setListConversationsData(newList);
  };

  const getHistoryConversation = async (id_conversation: number) => {
    const conver = await dispatch(GetConversationReducer(id_conversation, false))
    console.log(conver);
    
    setChatData(conver)
    console.log("datos");
  }

  if (rex_loading) {
    return (
      <Card>
        <Skeleton active />
      </Card>
    );
  }

  if (rex_error) {
    return <div>Error: {rex_error}</div>;
  }

  return (
    <>
      {
        localStorage.getItem("chat_seleccionado") ? (
          <Card>
            <Row>
              <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
                <Card
                  title={<div>Conversaciones</div>}
                  style={{ maxHeight: '600px', overflowY: 'auto' }}
                >
                  <div>
                    {listConversationsData.map((conversation: any, index: number) => (
                      <div
                        key={conversation.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          borderBottom: '1px solid #C4C4C4',
                          marginBottom: '10px',
                          paddingBottom: '10px',
                        }}
                        onClick={() => {
                          console.log("obtener");
                          getHistoryConversation(conversation.id)
                        }}
                      >
                        <div
                          style={{ width: '250px', cursor: 'pointer' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                              style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '100%',
                                background: '#52c41a',
                                marginRight: '10px',
                              }}
                            ></div>
                            Conversación #{index + 1}
                          </div>
                          <div>{new Date(conversation.creadoEn).toLocaleString()}</div>
                        </div>
                        <div style={{ width: '100%', textAlign: 'right' }}>
                          <DeleteTwoTone
                            onClick={() => handleRemove(index)}
                            twoToneColor="#eb2f96"
                            style={{ fontSize: '20px', cursor: 'pointer' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
              <Col xl={12} md={12} style={{ paddingLeft: '10px' }}>
                <ChatComponent data={chatData} />
              </Col>
            </Row>
          </Card>
        ) : (
          <NoAccess />
        )
      }
    </>
  );
};

export default TabConversations;
