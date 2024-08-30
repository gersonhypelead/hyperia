import { useState, useEffect } from 'react';
import defaultImg from '../../assets/img/avatars/robot.avif';
import ChatComponent from '../chat/ChatComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import './FloatMessage.css';
import { GetConversationSupportReducer } from '../../redux/actions/chatBots/Chat/ChatSupport';

const FloatMessage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    rex_conversation_support_chat
  } = useSelector((state: RootState) => state.conversation);

  const [showMessage, setShowMessage] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: '90vh', left: '90vw' });
  const [isTooltipExpanded, setIsTooltipExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    GetConversation();
  }, [])

  const GetConversation = async () => {
    await dispatch(GetConversationSupportReducer());
  }

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

    // setShowMessage(true);
    // setTimeout(() => {
    //   setShowMessage(false);
    // }, 6000);
  };

  const handleCircleClick = () => {
    setShowTooltip(!showTooltip);
    setIsTooltipExpanded(!isTooltipExpanded);
  };

  return (
    <div
      className={`notification-container ${isTooltipExpanded ? 'top-right' : ''
        }`}
      style={{ top: position.top, left: position.left }}
      draggable={false}
    // onDragEnd={handleDragEnd}
    >
      {showTooltip && (
        <div
          className={`tooltip-container ${isTooltipExpanded ? 'expanded' : ''}`}
        >
          <ChatComponent
            nombreChat='Soporte Vezzos'
            editBubble={false}
            resetChat={false}
            supportChat={true}
            data={rex_conversation_support_chat}
          />
        </div>
      )}

      <div
        className="circle"
        style={{ backgroundImage: `url(${defaultImg})`, cursor: 'pointer' }}
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
