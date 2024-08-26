import { useState, useEffect } from 'react';
import './FloatMessage.css';
import defaultImg from '../../assets/img/avatars/robot.avif';
import ChatComponent from '../chat/ChatComponent';

const FloatMessage = () => {
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
      className={`notification-container ${
        isTooltipExpanded ? 'top-right' : ''
      }`}
      style={{ top: position.top, left: position.left }}
      draggable
      onDragEnd={handleDragEnd}
    >
      {showTooltip && (
        <div
          className={`tooltip-container ${isTooltipExpanded ? 'expanded' : ''}`}
        >
          <ChatComponent />
        </div>
      )}

      <div
        className="circle"
        style={{ backgroundImage: `url(${defaultImg})` }}
        onClick={handleCircleClick}
      >
        <div className="notification-dot"></div>
      </div>
      {showMessage && (
        <div
          className={`notification-message-dos ${
            position.left === '0px' ? 'right' : 'left'
          }`}
        >
          mensaje example
        </div>
      )}
    </div>
  );
};

export default FloatMessage;
