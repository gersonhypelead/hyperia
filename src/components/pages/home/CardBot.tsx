import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Button, Modal, Dropdown,
  Menu, Row, Col, Skeleton,
  Avatar
} from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AvatarRobot from '../../../assets/img/avatars/robot.avif';
import {
  GetCountConversationsByUserAndChatHomeReducer,
  GetCountMessagesByUserAndChatHomeReducer,
  GetCountTokensByChatbotHomeReducer,
  GetDataChatsBotsHomeReducer,
  GetaverAgeConversationsMessagesByUserAndChatHomeReducer,
  SelectBotReducer,
  SetConversacionSeleccionadaHome,
  UpdateChatSeccionadoHome,
  deleteChatbotReducer,
  duplicateChatbotReducer
} from '../../../redux/actions/home/Home';
import { AppDispatch, RootState } from '../../../redux/store/store';
import '../../../styles/pages/home/Home.css';
import {
  GetConversationReducer,
  ResetConversationReducer
} from '../../../redux/actions/chatBots/Chat/Chat';
import { useNavigate } from 'react-router-dom';
import ChatComponent from '../../chat/ChatComponent';
import { GetOneDesingChatReducer } from '../../../redux/actions/chatBots/Chat/ChatDesing';
import { updateChatbotSeleccionadoHome } from '../../../redux/actions/home/homeActions';
import {
  CheckCircleTwoTone,
  SendOutlined,
  UserOutlined,
  RobotOutlined, CloseCircleOutlined
} from '@ant-design/icons';
const { confirm } = Modal;
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
interface PropsCardBot {
  chatWithBot: boolean;
}

const CardBot: React.FC<PropsCardBot> = ({ chatWithBot = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState<any>(null);
  const [chatbot_seleccionado, setChatbot_seleccionado] = useState("");
  
  const { rex_chatsbots, rex_loading, rex_error, rex_chat_selecccionado } = useSelector(({ home }: RootState) => home);
  const { rex_conversation_chat } = useSelector(({ tabChat }: RootState) => tabChat);
  const { rex_user_auth } = useSelector(({ auth }: RootState) => auth);
  const { rex_design_chat, rex_design_status, rex_styles } = useSelector((state: RootState) => state.design);

  const id_conversation = rex_chat_selecccionado
  let selectedChatId = rex_chat_selecccionado;

  useEffect(() => {
    selectedChatId = rex_chat_selecccionado;
    dispatch(GetDataChatsBotsHomeReducer());
  }, [selectedChatbot]);

  

  const showModal = async (chatbot: any) => {
    setSelectedChatbot(chatbot);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMenuClick = (chatbot: any) => ({ key }: { key: string }) => {

    let id_usuario = 0;
    if (rex_user_auth) id_usuario = rex_user_auth.id;

    if (key === 'editar') {
      navigate('/chats');
    } else if (key === 'duplicar') {
      confirm({
        title: '¿Estás seguro de duplicar este bot?',
        content: 'Esta opción duplicara todo el entrenamiento que se le haya realizado al bot',
        okText: 'Sí',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          const usuarioId = id_usuario;
          dispatch(duplicateChatbotReducer(usuarioId, chatbot.id));
        },
        onCancel() { },
      });
    } else if (key === 'eliminar') {
      confirm({
        title: '¿Estás seguro de eliminar este chatbot?',
        content: 'Una vez eliminado, no podrás recuperar este chatbot.',
        okText: 'Sí',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          dispatch(deleteChatbotReducer(chatbot.id));
        },
        onCancel() {
        },
      });
    }
  };

  const menu = (chatbot: any) => (
    <Menu onClick={handleMenuClick(chatbot)}>
      <Menu.Item key="editar">Editar</Menu.Item>
      <Menu.Item key="duplicar">Duplicar</Menu.Item>
      <Menu.Item key="eliminar">Eliminar</Menu.Item>
    </Menu>
  );

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
    estadoHorario: false
  });


  useEffect(() => {
    dispatch(GetOneDesingChatReducer());
  }, [rex_styles]);

  useEffect(() => {
    if (rex_design_chat) {
      setInitialValues({
        fontSize: rex_design_chat.tamanoLetra || '',
        fontFamily: rex_design_chat.fuente || '10',
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
        estadoHorario: rex_design_chat.estadoHorario || false,
      });
    }
  }, [rex_design_chat, rex_styles]);

  return (
    <>
      {/* <p>hola</p> */}
      {rex_loading ? (
        <Row gutter={[16, 16]}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Col key={index} xl={6} md={12} sm={24}>
              <Card
                className="custom-card"
                style={{
                  height: "260px",
                  overflow: 'hidden',
                  marginBottom: '16px',
                  // margin: "200px"
                }}
              >

                <Skeleton loading={rex_loading} avatar paragraph={{ rows: 2 }} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : rex_error ? (
        <p style={{ color: 'red' }}>Error: {rex_error}</p>
      ) : (
        rex_chatsbots.length > 0 && (
          <Row gutter={[16, 16]}>
            {rex_chatsbots.slice(0, 10).map((chatbot: any, index: number) => (
              <Col key={index} xl={6} md={12} sm={24}>
                <Card
                  className={
                    selectedChatId === chatbot.id
                      ? "custom-card-select"
                      : "custom-card"
                  }
                  style={{ height: "260px", overflow: 'hidden', marginBottom: '16px' }}
                  actions={chatWithBot ? [
                    <Button type="link" onClick={() => {
                      showModal(chatbot)
                    }}>Conversar con el Chat</Button>
                  ] : []}
                  onClick={() => {

                    setChatbot_seleccionado(chatbot.id);
                    dispatch(SelectBotReducer(index, !chatbot.select));
                    dispatch(ResetConversationReducer());
                    if (chatbot.id) {
                      dispatch(GetCountMessagesByUserAndChatHomeReducer(chatbot.id));
                      dispatch(GetCountConversationsByUserAndChatHomeReducer(chatbot.id));
                      dispatch(GetaverAgeConversationsMessagesByUserAndChatHomeReducer(chatbot.id))
                      dispatch(GetCountTokensByChatbotHomeReducer(chatbot.id))
                      dispatch(UpdateChatSeccionadoHome(chatbot.id))
                    }
                    if (chatbot.conversacionId) {
                      dispatch(SetConversacionSeleccionadaHome(chatbot.conversacionId))
                    } else {
                      dispatch(SetConversacionSeleccionadaHome("0"))
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <img
                      src={chatbot.logo == "http://url" ? AvatarRobot : chatbot.logo}

                      style={{
                        borderRadius: '100%',
                        width: '60px',
                        height: '60px',
                        marginRight: '10px',
                        background: chatbot.logo ? '#E6F4FF' : '#ccc', // color de fondo diferente si no hay imagen
                        objectFit: 'cover',
                        cursor: 'pointer',
                      }}

                    />
                    <span>{chatbot.nombre || "Nombre no disponible"}</span>
                    <Dropdown
                      overlay={menu(chatbot)}
                      trigger={['click']}
                    >
                      <MoreOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
                    </Dropdown>
                  </div>
                  <div className="card-description" style={{ marginTop: '10px' }}>
                    {chatbot.descripcion || "Descripción no disponible"}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )
      )}
      <Modal
        title="InfoBot"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={500}
      >

        <ChatComponent
          idConversation={
            id_conversation
              ? parseInt(id_conversation?.toString())
              : 0
          }
          data={rex_conversation_chat}
          editBubble={false}
          nombreChat={selectedChatbot?.nombre || ''}
          resetChat={true}

          fontSize={selectedChatbot?.tamanoLetra || ''}
          fontFamily={selectedChatbot?.fuente}
          inputPlaceholder={selectedChatbot?.placeholder}
          iconoEnviarChat={selectedChatbot?.iconoEnvio}
          logoChat={selectedChatbot?.logo}
          estadoChat={selectedChatbot?.estado}
          coloresStyle={
            {
              colorCabecera: selectedChatbot?.colorCabecera || '#1677ff',
              colorTextoEmisor: selectedChatbot?.colorTextoEmisor || '#1677ff',
              colorTextoReceptor: selectedChatbot?.colorTextoReceptor || '#1677ff',
              colorTitulo: selectedChatbot?.colorTitulo || '#1677ff',
              colorEstado: selectedChatbot?.colorEstado || '#0BF732'
            }
          }
          estadoHorario={selectedChatbot?.estadoHorario}
        />
      </Modal>
    </>
  );
};
export default CardBot;