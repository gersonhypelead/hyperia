import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Modal, Row, Skeleton, Input } from 'antd';
import { Button, ConfigProvider } from 'antd';
import { AntDesignOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { AddCaseTrainReducer, GetConversacionReducer, GetDataChatBotsReducer, GetDataTrainsReducer, DeleteTrainReducer, EditTrainReducer } from '../../../../redux/actions/chatBots/Entrenar/ChatBots';
import ChatComponent from '../../../../components/chat/ChatComponent';
import type { SelectProps } from 'antd';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import NoAccess from '../../../../components/pages/chat/NoAccess';
import { GetDataConversationsReducer } from '../../../../redux/actions/chatBots/conversation/Conversation';
import { GetOneDesingChatReducer } from '../../../../redux/actions/chatBots/Chat/ChatDesing';

type LabelRender = SelectProps['labelRender'];
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
  const [listConversationsData, setListConversationsData] = useState<any[]>([]);
  const { rex_chat_selecccionado } = useSelector(({ home }: RootState) => home);


  const { rex_conversations, rex_loading, rex_error } = useSelector((state: RootState) => state.conversation);
  const [listCasos, setListCasos] = useState([{ label: '' }]);
  const [showModalAddCase, setShowModalAddCase] = useState(false);
  const [nameCase, setNameCase] = useState('');
  const [chatData, setChatData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [casoSeleccionado, setCasoSeleccionado] = useState<null | number>(null);
  const [caseSelect, setCaseSelect] = useState<any>({});
  const [showModalEditCase, setShowModalEditCase] = useState(false);
  const [editCaseName, setEditCaseName] = useState('');
  const [editCaseId, setEditCaseId] = useState<number | null>(null);

  const handleEditCase = (id: number, currentName: string) => {
    setEditCaseId(id);
    setEditCaseName(currentName);
    setShowModalEditCase(true);
  };

  const handleEditCaseConfirm = async () => {
    if (editCaseId !== null) {
      await dispatch(EditTrainReducer(editCaseId, editCaseName));
      await dispatch(GetDataTrainsReducer());
    }
    setShowModalEditCase(false);
  };

  const dispatch = useDispatch<AppDispatch>();
  const { rex_chatbots, rex_list_trains } = useSelector(
    ({ chatBots }: any) => chatBots
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(GetDataChatBotsReducer());
      await dispatch(GetDataTrainsReducer());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleAddCase = async () => {
    await dispatch(AddCaseTrainReducer(nameCase));
    await dispatch(GetDataTrainsReducer());

    setShowModalAddCase(false);
  };

  const handleDeleteTrain = async (trainId: number) => {
    // Confirmar la acción antes de proceder
    Modal.confirm({
      title: "¿Estás seguro de que deseas eliminar este entrenamiento?",
      content: "Esta acción no se puede deshacer.",
      okText: "Eliminar",
      cancelText: "Cancelar",
      onOk: async () => {
        // Llama a la acción para eliminar el entrenamiento
        await dispatch(DeleteTrainReducer(trainId));

        // Actualiza la lista de entrenamientos después de eliminar
        await dispatch(GetDataTrainsReducer());
      },
    });
  };


  const changeChatData = (content: Array<any>) => {
    setChatData(content);
  };

  const options = rex_chatbots?.map((chatbot: any) => ({
    label: chatbot.nombre,
    value: chatbot.nombre,
  }));

  useEffect(() => {

    dispatch(GetDataConversationsReducer());
  }, [rex_chat_selecccionado]);

  useEffect(() => {
    if (rex_conversations) {
      setChatData(rex_conversations[0]);
      setListConversationsData(rex_conversations);
    }
  }, [rex_conversations]);

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
    estadoHorario: true,
  });
  const { rex_design_chat, rex_design_status, rex_styles } = useSelector((state: RootState) => state.design);

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

  return (
    <>
      {rex_chat_selecccionado ? (
        <Card>
          <Row gutter={[24, 24]}>
            <Col xl={12} md={12}>
              <ChatComponent
                editBubble={true}
                modeBot={true}
                // iaActivate={false}
                data={chatData}
                idConversation={caseSelect.id}
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
                resetChat={false}
                estadoHorario={initialValues.estadoHorario}
              />
            </Col>
            <Col xl={12} md={12}>
              <Row style={{ marginTop: '20px' }}>
                <Col xl={24} md={24}>
                  <span>Lista de casos de entrenamiento:</span>
                  <Skeleton active loading={loading}>
                    <div>
                      {loading ? (
                        <>
                          <Skeleton.Button
                            active
                            style={{
                              width: '100%',
                              height: '40px',
                              marginBottom: '10px',
                            }}
                          />
                          <Skeleton.Button
                            active
                            style={{
                              width: '100%',
                              height: '40px',
                              marginBottom: '10px',
                            }}
                          />
                          <Skeleton.Button
                            active
                            style={{
                              width: '100%',
                              height: '40px',
                              marginBottom: '10px',
                            }}
                          />
                        </>
                      ) : rex_list_trains ? (
                        rex_list_trains?.map((caso: any, index: number) => {
                          return (
                            <div
                              key={caso.id}
                              style={{
                                marginTop: '5px',
                                display: "flex", // Flexbox para el contenedor
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <ConfigProvider>
                                <Button
                                  type={casoSeleccionado == index ? 'primary' : 'default'}
                                  size="large"
                                  onClick={async () => {
                                    setCaseSelect(caso);
                                    setCasoSeleccionado(index);
                                    const conversation = await dispatch(GetConversacionReducer(caso.id));
                                    changeChatData(conversation);
                                  }}
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    textAlign: 'left',
                                    whiteSpace: 'normal',
                                    lineHeight: '1.5',
                                    padding: '10px',
                                    gap: '8px',
                                    minHeight: 'fit-content',
                                  }}
                                >
                                  <span style={{ flex: 1, wordBreak: 'break-word' }}>
                                    <AntDesignOutlined style={{ marginRight: '8px' }} />
                                    {caso.descripcion}
                                  </span>

                                  <span
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '10px',
                                    }}
                                  >
                                    {/* Ícono de editar */}
                                    <EditOutlined
                                      style={{ color: 'blue', cursor: 'pointer' }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditCase(caso.id, caso.descripcion);
                                      }}
                                    />

                                    {/* Ícono de eliminar */}
                                    <DeleteOutlined
                                      style={{ color: 'red', cursor: 'pointer' }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteTrain(caso.id);
                                      }}
                                    />
                                  </span>
                                </Button>

                              </ConfigProvider>
                            </div>

                          );
                        })
                      ) : null}
                      <div style={{ marginTop: '25px' }}>
                        <Button
                          type="dashed"
                          size="large"
                          onClick={() => {
                            setShowModalAddCase(true)
                            setNameCase("")
                          }}
                          style={{
                            background: '#308446',
                            color: 'white'
                          }}
                        >
                          Nuevo Caso +
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
                        <Input
                          defaultValue={''}
                          value={nameCase}
                          onChange={(e) => setNameCase(e.target.value)}
                        />
                      </Modal>
                      <Modal
                        title="Editar nombre del Entrenamiento"
                        open={showModalEditCase}
                        onOk={handleEditCaseConfirm}
                        onCancel={() => setShowModalEditCase(false)}
                        okText="Guardar"
                        cancelText="Cancelar"
                      >
                        <Input
                          value={editCaseName}
                          onChange={(e) => setEditCaseName(e.target.value)}
                          placeholder="Escriba el nuevo nombre del caso"
                        />
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
      )}
    </>
  );
};

export default TabTrain;
