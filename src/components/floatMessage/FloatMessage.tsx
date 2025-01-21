import { useState, useEffect } from 'react';
import defaultImg from '../../assets/img/avatars/robot.avif';
import ChatComponent from '../chat/ChatComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import './FloatMessage.css';
import { GetConversationSupportReducer } from '../../redux/actions/embedded/Embedded';
import { GetOneDesingChatReducer, GetOneDesingChatSupportReducer } from '../../redux/actions/chatBots/Chat/ChatDesing';
import { GetDataConversationsReducer } from '../../redux/actions/chatBots/conversation/Conversation';
import { GetConversationEmbeddedReducer } from '../../redux/actions/embedded/Embedded';

interface FloatMessageProps {
  idChatBot?: number  ;
  embedded?: boolean;
  tokenChatbot?: string;
  supportChat?:boolean;
}
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

const FloatMessage: React.FC<FloatMessageProps> = ({
  idChatBot,
  embedded = false,
  tokenChatbot ,
  supportChat = false
}) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    rex_conversation_support_chat
  } = useSelector((state: RootState) => state.conversation);
  const { rex_chat_selecccionado } = useSelector(({ home }: RootState) => home);
  const [showMessage, setShowMessage] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({
    top: '90vh', left: '90vw'
  });
  const [isTooltipExpanded, setIsTooltipExpanded] = useState(false);
  const [chatData, setChatData] = useState<any>(null);

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

  const {
    rex_design_chat,
    rex_design_status,
    rex_styles
  } = useSelector((state: RootState) => state.design);

/*   useEffect(() => {
    console.log(tokenChatbot)
    dispatch(GetOneDesingChatReducer(tokenChatbot));
  }, [dispatch, rex_styles , tokenChatbot ]); */

  useEffect(() => {
    dispatch(GetOneDesingChatSupportReducer());
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
        iconoRuta: rex_design_chat.iconoEnvio || 'http://url',
        logoRuta: rex_design_chat.logo || 'http://url',
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchConversation = async () => {

      let conver
      if(tokenChatbot){
        conver = await dispatch(GetConversationEmbeddedReducer(tokenChatbot || "", false))
        setChatData(conver)

      }else {
        console.log("entor aqui")
        conver = await dispatch(GetConversationSupportReducer( "", false))
        setChatData(conver)
      }
      console.log(conver)
    }
  
    fetchConversation()
  }, [dispatch, tokenChatbot])

  const handleDragEnd = (e: any) => {
    const screenWidth = window.innerWidth;
    const newTop = e.clientY + window.scrollY;
    let newLeft;

    if (e.clientX < screenWidth / 2) {
      newLeft = 0;
    } else {
      newLeft = e.clientX - 25;
    }

    setPosition({
      top: `${newTop}px`,
      left: `${newLeft}px`,
    });


  };

  const handleCircleClick = () => {
    setShowTooltip(!showTooltip);
    setIsTooltipExpanded(!isTooltipExpanded);
    dispatch(GetOneDesingChatReducer(tokenChatbot));
  };

  return (

    <div
      // className={`notification-container ${isTooltipExpanded ? 'top-right' : ''}`}
      // className={` ${isTooltipExpanded ? 'absolute' : 'absolute'}`}
      className={
        embedded
          ? `${isTooltipExpanded ? 'absolute' : 'absolute'}`
          : `notification-container ${isTooltipExpanded ? 'top-right' : ''}`
      }
      style={embedded ? {} : {
        //  top: position.top, left: position.left,
        bottom: "30px",
        position: "fixed",
        right: "30px"
      }}
      draggable={false}
    // onDragEnd={handleDragEnd}
    >
      {/* <p> HGOLA</p> */}
      {showTooltip && (
        <div
          className={
            embedded
              ? `tooltip-container ${isTooltipExpanded ? 'expanded' : ''}`
              : `tooltip-container ${isTooltipExpanded ? 'expanded' : ''}`
          }
          style={
            embedded
              ? {
                top: "0px !important"
              }
              : {
                top: "-470px",
                right: "40px"
              }
          }
        >
          <ChatComponent
            /* nombreChat='Soporte Vezzos' */
            data={chatData}
            editBubble={false}
            resetChat={true}
            supportChat={supportChat}
         /*    data={rex_conversation_support_chat} */

            fontSize={initialValues.fontSize}
            fontFamily={initialValues.fontFamily}
            nombreChat={initialValues.nombreChat}
            inputPlaceholder={initialValues.inputPlaceholder}
            iconoEnviarChat={initialValues.iconoRuta}
            logoChat={initialValues.logoRuta}
            estadoChat={initialValues.estado}
            estadoHorario= {initialValues.estadoHorario}
            coloresStyle={
              {
                colorCabecera: initialValues.colorHeader,
                colorTextoEmisor: initialValues.colorEmisor,
                colorTextoReceptor: initialValues.colorReceptor,
                colorTitulo: initialValues.colorTitulo,
                colorEstado: initialValues.colorEstado
              }
            }
            idChatBot={idChatBot}
            tokenChatbot={tokenChatbot}
            embedded={embedded}
          />
        </div>
      )}

      <div
        className="circle"
        style={
          embedded
            ? {
              backgroundImage: `url(${defaultImg})`, cursor: 'pointer',
              top: '470px', left: '430px',
              zIndex: '100'
            }
            : { backgroundImage: `url(${defaultImg})`, cursor: 'pointer', zIndex: '100' }
        }
        onClick={handleCircleClick}
      >
        <div className="notification-dot"></div>
      </div>
      {showMessage && (
        <div
          className={`notification-message-dos ${position.left === '0px' ? 'right' : 'left'
            }`}
        >
          Hola, necesitas ayuda?
        </div>
      )}
    </div>
  );
};

export default FloatMessage;
