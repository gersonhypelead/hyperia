import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Modal, Row, Select, Skeleton } from 'antd';
import { Button, ConfigProvider } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { AddCaseTrainReducer, GetConversacionReducer, GetDataChatBotsReducer, GetDataTrainsReducer } from '../../../../redux/actions/chatBots/Entrenar/ChatBots'; // Importa la acción correcta
import ChatComponent from '../../../../components/chat/ChatComponent';
import type { SelectProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AppDispatch } from '../../../../redux/store/store';
import NoAccess from '../../../../components/pages/chat/NoAccess';

type LabelRender = SelectProps['labelRender'];

const labelRender: LabelRender = (props) => {
  const { label, value } = props;

  if (label) {
    return value;
  }
  return <span>Opciones</span>;
};

const TabTrain: React.FC = () => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();

  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(
        .${rootPrefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `;

  const [listCasos, setListCasos] = useState([{ label: "" }]);
  const [showModalAddCase, setShowModalAddCase] = useState(false);
  const [nameCase, setNameCase] = useState('');
  const [chatData, setChatData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [caseSelect, setCaseSelect] = useState<any>({});

  const dispatch = useDispatch<AppDispatch>();
  const {
    rex_chatbots,
    rex_list_trains
  } = useSelector(({ chatBots }: any) => chatBots);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(GetDataChatBotsReducer());
      await dispatch(GetDataTrainsReducer());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  // useEffect(() => {
  //   if (chatbots?.length > 0) {
  //     setChatData(chatbots[0]);
  //   }
  // }, [chatbots]);

  const handleAddCase = async () => {
    // setListCasos([...listCasos, { label: nameCase }]);
    await dispatch(AddCaseTrainReducer(nameCase))
    await dispatch(GetDataTrainsReducer());

    setShowModalAddCase(false);
  };

  const changeChatData = (content: Array<any>) => {
    setChatData(content);
  };

  const options = rex_chatbots?.map((chatbot: any) => ({
    label: chatbot.nombre,
    value: chatbot.nombre
  }));

  // const options: any = []

  useEffect(() => {
    // changeChatData(mockedCases[0]);

    // const obtenerCasos = async () => {
    //   try {
    //     const response = await fetch('http://localhost:3005/chatbots/1/conversaciones/1/mensajes');
    //     const data = await response.json();
    //     console.log(data, "--232323 - cambio")
    //     const formato: [] = data.map((item: any) => ({
    //       label: item.descripcion
    //     }));
    //     console.log("segundo")

    //     setListCasos(formato)
    //     console.log("tercero")
    //   } catch (error) {
    //     console.error('Error fetching messages:', error);
    //   }
    // };

    // obtenerCasos();


  }, []);

  return (
    <>
      {
        localStorage.getItem("chat_seleccionado") ? (
          <Card>
            <Row>
              <Col xl={12} md={12}>
                <ChatComponent
                  editBubble={true} modeBot={true} data={chatData}
                  idConversation={caseSelect.id}
                />
              </Col>
              <Col xl={12} md={12}>
                <Row>
                  <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
                    <span>Selecciona un chat</span>
                    <Skeleton active loading={loading} paragraph={{ rows: 1 }}>
                      <Select
                        labelRender={labelRender}
                        defaultValue={options?.length > 0 ? options[0].value : ""} // Asegúrate de que haya una opción predeterminada
                        style={{ width: '100%' }}
                        options={options}
                        onChange={(value) => {
                          const selectedChatbot = rex_chatbots.find((chatbot: any) => chatbot.nombre === value);
                          if (selectedChatbot) {
                            setChatData(selectedChatbot);
                          }
                        }}
                      />
                    </Skeleton>
                  </Col>
                  <Col xl={12} md={12} style={{ paddingLeft: '10px' }}>
                    <span>Exporta un chat de ejemplo</span>
                    <Skeleton active loading={loading} paragraph={{ rows: 1 }}>
                      <Select
                        labelRender={labelRender}
                        defaultValue={options?.length > 0 ? options[0].value : undefined} // Asegúrate de que haya una opción predeterminada
                        style={{ width: '100%' }}
                        options={options}
                        onChange={(value) => {
                          const selectedChatbot = rex_chatbots.find((chatbot: any) => chatbot.nombre === value);
                          if (selectedChatbot) {
                            setChatData(selectedChatbot);
                          }
                        }}
                      />
                    </Skeleton>
                  </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <Col xl={24} md={24}>
                    <span>Lista de casos:</span>
                    <Skeleton active loading={loading}>
                      <div>
                        {loading ? (
                          <>
                            <Skeleton.Button active style={{ width: '100%', height: '40px', marginBottom: '10px' }} />
                            <Skeleton.Button active style={{ width: '100%', height: '40px', marginBottom: '10px' }} />
                            <Skeleton.Button active style={{ width: '100%', height: '40px', marginBottom: '10px' }} />
                          </>
                        ) : (
                          rex_list_trains ? (
                            rex_list_trains?.map((caso: any, index: number) => {

                              return (
                                <div key={caso.id} style={{ marginTop: '5px' }}>
                                  <ConfigProvider
                                  // button={{
                                  //   className: linearGradientButton,
                                  // }}
                                  >
                                    <Button
                                      type="primary"
                                      size="large"
                                      icon={<AntDesignOutlined />}
                                      onClick={async () => {
                                        // changeChatData(mockedCases[index])
                                        setCaseSelect(caso)

                                        const conversation = await dispatch(GetConversacionReducer(caso.id))
                                        changeChatData(conversation)


                                      }}
                                    >
                                      {caso.descripcion}
                                    </Button>
                                  </ConfigProvider>
                                </div>
                              );
                            })
                          ) : null
                        )}
                        <div style={{ marginTop: '5px' }}>
                          <Button
                            type="primary"
                            size="large"
                            onClick={() => setShowModalAddCase(true)}
                          >
                            +
                          </Button>
                        </div>
                        <Modal
                          title="Agregar caso"
                          open={showModalAddCase}
                          onOk={handleAddCase}
                          onCancel={() => setShowModalAddCase(false)}
                          okText="Agregar"
                          cancelText="Cancelar"
                        >
                          <div style={{ margin: '20px' }} />
                          <span>Tipo de Caso:</span>
                          <TextArea
                            defaultValue={''}
                            value={nameCase}
                            onChange={(e) => setNameCase(e.target.value)}
                          />
                          {/* <div style={{margin: '20px'}} />
                      <span>Mensaje Receptor</span>
                      <TextArea
                        defaultValue={''}
                        value={nameCase}
                        onChange={(e) => setNameCase(e.target.value)}
                      /> */}
                        </Modal>
                      </div>
                    </Skeleton>
                  </Col>
                </Row>
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

export default TabTrain;