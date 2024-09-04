import { Card, Col, Collapse, Row, Select, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import ChatComponent from '../../../../components/chat/ChatComponent';
import NoAccess from '../../../../components/pages/chat/NoAccess';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store/store';
import { GetConversationReducer, ResetConversationReducer } from '../../../../redux/actions/chatBots/Chat/Chat';
import type { SelectProps } from 'antd';
import { GetDataChatsBotsHomeReducer, SelectBotReducer } from '../../../../redux/actions/home/Home';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

type LabelRender = SelectProps['labelRender'];
const labelRender: LabelRender = (props) => {
  const { label, value } = props;

  if (label) {
    return value;
  }
  return <span>Opciones</span>;
};

const TabChat: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const {
    rex_conversation_chat
  } = useSelector(({ tabChat }: any) => tabChat);
  // const {
  //   rex_chatbots,
  //   rex_list_trains
  // } = useSelector(({ chatBots }: any) => chatBots);

  const {
    rex_chatsbots,
    rex_loading,
    rex_error
  } = useSelector(({ home }: any) => home);

  const [chatData, setChatData] = useState<any>([]);
  // const [loading, setLoading] = useState(true);

  const id_conversation = localStorage.getItem("TAB_CHAT_CONVERSACION_ID");

  useEffect(() => {
    if (id_conversation) {
      GetConversation();
    }
  }, [])

  useEffect(() => {
    dispatch(GetDataChatsBotsHomeReducer());
  }, []);

  const GetConversation = async () => {
    await dispatch(GetConversationReducer());
  }

  const options = rex_chatsbots?.map((chatbot: any) => ({
    label: chatbot.nombre,
    value: chatbot.nombre
  }));

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
                <Row
                  style={{
                    marginBottom: '20px'
                  }}
                >
                  <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
                    <span>Selecciona un chat</span>
                    <Skeleton active loading={rex_loading} paragraph={{ rows: 1 }}>
                      <Select
                        labelRender={labelRender}
                        // defaultValue={options?.length > 0 ? options[0].value : ""} // Asegúrate de que haya una opción predeterminada
                        defaultValue={
                          options?.length > 0
                            ? localStorage.getItem('chat_seleccionado')
                              ? rex_chatsbots.find((option: any) => option.id == localStorage.getItem('chat_seleccionado')).nombre
                              : ""
                            : ""
                        } // Asegúrate de que haya una opción predeterminada
                        style={{ width: '100%' }}
                        options={options}
                        onChange={(value) => {
                          rex_chatsbots.map((chatbot: any, index: number) => {
                            if (chatbot.nombre === value) {
                              setChatData(chatbot);
                              localStorage.setItem("chat_seleccionado", chatbot.id)
                              dispatch(SelectBotReducer(index, !chatbot.select))
                              if (chatbot.conversacionId) {
                                localStorage.setItem("TAB_CHAT_CONVERSACION_ID", chatbot.conversacionId);
                                GetConversation()
                              }else{
                                localStorage.removeItem("TAB_CHAT_CONVERSACION_ID");
                                dispatch(ResetConversationReducer());
                              }
                            }
                          });
                        }}
                      />
                    </Skeleton>
                  </Col>
                  <Col xl={12} md={12} style={{ paddingLeft: '10px' }}>
                    {/* <span>Exporta un chat de ejemplo</span>
                    <Skeleton active loading={rex_loading} paragraph={{ rows: 1 }}>
                      <Select
                        labelRender={labelRender}
                        defaultValue={options?.length > 0 ? options[0].value : undefined} // Asegúrate de que haya una opción predeterminada
                        style={{ width: '100%' }}
                        options={options}
                        onChange={(value) => {
                          const selectedChatbot = rex_chatsbots.find((chatbot: any) => chatbot.nombre === value);
                          if (selectedChatbot) {
                            setChatData(selectedChatbot);
                          }
                        }}
                      />
                    </Skeleton> */}
                  </Col>
                </Row>

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
                        label: 'ol',
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
