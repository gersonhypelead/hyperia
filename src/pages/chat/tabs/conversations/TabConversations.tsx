import React, { useEffect, useState } from 'react';
import { Card, Col, Pagination, Row, Skeleton, Popconfirm, message } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ChatComponent from '../../../../components/chat/ChatComponent';
import { DeleteDataConversationsReducer, GetDataConversationsReducer, setCurrentPage } from '../../../../redux/actions/chatBots/conversation/Conversation';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import NoAccess from '../../../../components/pages/chat/NoAccess';
import { GetConversationReducer } from '../../../../redux/actions/chatBots/Chat/Chat';
import { GetOneDesingChatReducer } from '../../../../redux/actions/chatBots/Chat/ChatDesing';
interface FormValues {
  fontSize: string;
  fontFamily: string;
  nombreChat: string;
  inputPlaceholder: string;
  logo: File | null;
  icono: File | null;
  iconoRuta: string;
  logoRuta: string;
  colorHeader: string;
  colorTitulo: string;
  colorEmisor: string;
  colorReceptor: string;
  estado: boolean;
  colorEstado: string;
  estadoHorario: boolean;
}
const TabConversations: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { rex_design_chat, rex_design_status, rex_styles } = useSelector((state: RootState) => state.design);
  const { rex_conversations, rex_loading, rex_error, rex_limit, rex_page, rex_total, } = useSelector((state: RootState) => state.conversation);
  const { rex_chat_selecccionado } = useSelector(({ home }: RootState) => home);
  const [initialValues, setInitialValues] = useState<FormValues>({
    fontSize: '',
    fontFamily: '',
    nombreChat: '',
    inputPlaceholder: '',
    logo: null,
    icono: null,
    iconoRuta: '',
    logoRuta: '',
    colorHeader: '#1677ff',
    colorTitulo: '#1677ff',
    colorEmisor: '#1677ff',
    colorReceptor: '#1677ff',
    estado: false,
    colorEstado: '#0BF732',
    estadoHorario: true
  });

  const [chatData, setChatData] = useState<any>(null);
  const [listConversationsData, setListConversationsData] = useState<any[]>([]);

  useEffect(() => {
    dispatch(GetDataConversationsReducer());
  }, [rex_chat_selecccionado]);

  useEffect(() => {
    if (rex_conversations) {
      setChatData(rex_conversations[0]);
      setListConversationsData(rex_conversations);
    }
  }, [rex_chat_selecccionado, rex_conversations]);

  useEffect(() => {
    dispatch(GetOneDesingChatReducer());
  }, [dispatch, rex_styles]);
  useEffect(() => {
    if (rex_design_chat) {
      setInitialValues({
        fontSize: rex_design_chat.tamanoLetra || '',
        fontFamily: rex_design_chat.fuente || '',
        nombreChat: rex_design_chat.nombre || '',
        inputPlaceholder: rex_design_chat.placeholder || '',
        logo: null,
        icono: null,
        iconoRuta: rex_design_chat.iconoEnvio || '',
        logoRuta: rex_design_chat.logo || '',
        colorHeader: rex_design_chat.colorCabecera || '#1677ff',
        colorTitulo: rex_design_chat.colorTitulo || '#1677ff',
        colorEmisor: rex_design_chat.colorTextoEmisor || '#1677ff',
        colorReceptor: rex_design_chat.colorTextoReceptor || '#1677ff',
        estado: rex_design_chat.estado || false,
        colorEstado: rex_design_chat.colorEstado || '#0BF732',
        estadoHorario: rex_design_chat.estadoHorario
      });
    }
  }, [rex_design_chat, rex_styles]);

  const handleRemove = (id_conversacion: number, index: number) => {
    dispatch(DeleteDataConversationsReducer(id_conversacion))
    const newList = listConversationsData.filter((_, i) => i !== index);
    setListConversationsData(newList);
    message.success('Elemento eliminado correctamente');
  };
  const handleCancel = () => {
    message.info('Eliminación cancelada');
  };

  const getHistoryConversation = async (id_conversation: number) => {

    const conver = await dispatch(GetConversationReducer(id_conversation, false))
    setChatData(conver)
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
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(GetDataConversationsReducer(page - 1, rex_limit));
  };

  return (
    <>
      {
        rex_chat_selecccionado ? (
          <Card>
            <Row>
              <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
                <Card
                  title={<div>Conversaciones</div>}
                  style={{ maxHeight: '600px', overflowY: 'auto' }}
                  extra={
                    <Pagination
                      current={rex_page}
                      total={rex_total}
                      pageSize={rex_limit} // Usar el tamaño de página dinámico
                      onChange={handlePageChange}
                    />

                  }
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
                          <Popconfirm
                            title="¿Estás seguro de que deseas eliminar este elemento?"
                            onConfirm={() => handleRemove(conversation.id, index)}
                            onCancel={handleCancel}
                            okText="Sí"
                            cancelText="No"
                          >
                            <DeleteTwoTone
                              twoToneColor="#eb2f96"
                              style={{ fontSize: '20px', cursor: 'pointer' }}
                            />
                          </Popconfirm>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

              </Col>
              <Col xl={12} md={12} style={{ paddingLeft: '10px' }}>
                <ChatComponent data={chatData}
                  fontSize={initialValues.fontSize}
                  fontFamily={initialValues.fontFamily}
                  nombreChat={initialValues.nombreChat}
                  inputPlaceholder={initialValues.inputPlaceholder}
                  iconoEnviarChat={initialValues.iconoRuta}
                  logoChat={initialValues.logoRuta}
                  estadoChat={initialValues.estado}
                  coloresStyle={
                    {
                      colorCabecera: initialValues.colorHeader,
                      colorTextoEmisor: initialValues.colorEmisor,
                      colorTextoReceptor: initialValues.colorReceptor,
                      colorTitulo: initialValues.colorTitulo,
                      colorEstado: initialValues.colorEstado
                    }
                  }
                  editBubble={false}
                  resetChat={false}
                  disabledInput={true}
                  estadoHorario={initialValues.estadoHorario}
                />
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
