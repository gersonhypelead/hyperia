import { Card, Col, Collapse, Row, Select, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import ChatComponent from '../../../../components/chat/ChatComponent';
import NoAccess from '../../../../components/pages/chat/NoAccess';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store/store';
import {
  GetConversationReducer,
  ResetConversationReducer
} from '../../../../redux/actions/chatBots/Chat/Chat';
import type { SelectProps } from 'antd';
import { GetDataChatsBotsHomeReducer, SelectBotReducer } from '../../../../redux/actions/home/Home';
import { GetOneDesingChatReducer } from '../../../../redux/actions/chatBots/Chat/ChatDesing';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
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
  const { rex_chat_selecccionado, rex_conversacion_seleccionada } = useSelector(({ home }: RootState) => home);
  const {
    rex_chatsbots,
    rex_loading,
    rex_error
  } = useSelector(({ home }: any) => home);

  const [chatData, setChatData] = useState<any>([]);
  // const [loading, setLoading] = useState(true);

  const id_conversation = rex_conversacion_seleccionada;

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
        estadoHorario: rex_design_chat.estadoHorario || '#0BF732',
      });
    }
  }, [rex_design_chat, rex_styles]);
  return (
    <>
      {
        rex_chat_selecccionado ? (
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
                  estadoHorario={initialValues.estadoHorario}

                />
              </Col>

              <Col md={12} xl={12}>
                <Row
                  style={{
                    marginBottom: '20px'
                  }}
                >
                  <Col xl={12} md={12} style={{ paddingRight: '10px' }}>
                  </Col>
                  <Col xl={12} md={12} style={{ paddingLeft: '10px' }}>
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

export default TabChat;
