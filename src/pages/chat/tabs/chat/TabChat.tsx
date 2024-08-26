import { Card, Col, Collapse, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import ChatComponent from '../../../../components/chat/ChatComponent';
import NoAccess from '../../../../components/pages/chat/NoAccess';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store/store';
import { GetConversationReducer } from '../../../../redux/actions/chatBots/Chat/Chat';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const TabChat: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const {
    rex_conversation_chat
  } = useSelector(({ tabChat }: any) => tabChat);
  const [chatData, setChatData] = useState<any>([]);
  const id_conversation = localStorage.getItem("TAB_CHAT_CONVERSACION_ID");

  useEffect(() => {
    GetConversation();
  }, [])

  const GetConversation = async () => {
    const conversation = await dispatch(GetConversationReducer());
    // setChatData(conversation);
  }

  return (
    <>
      {
        localStorage.getItem("chat_seleccionado") ? (
          <Card>
            <Row>
              <Col md={12} xl={12}>
                <ChatComponent
                  editBubble={false}
                  idConversation={
                    id_conversation
                      ? parseInt(id_conversation?.toString())
                      : 0
                  }
                  data={rex_conversation_chat}
                />
              </Col>
              <Col md={12} xl={12}>
                <Space direction="vertical">
                  <Collapse
                    collapsible="header"
                    defaultActiveKey={['1']}
                    items={[
                      {
                        key: '1',
                        label: 'This panel can only be collapsed by clicking text',
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
                        label: 'This panel can only be collapsed by clicking icon',
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
            </Row>
          </Card>
        ) : (
          <NoAccess />
        )
      }
    </>
  );
};

export default TabChat;
