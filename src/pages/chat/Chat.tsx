import React, { useState, useEffect } from 'react';
import {
  WechatOutlined,
  WechatWorkOutlined,
  SlidersOutlined,
  FormatPainterOutlined,
  InteractionOutlined,
  PieChartOutlined,
  OrderedListOutlined,
  UsbTwoTone,
  RobotOutlined,
} from '@ant-design/icons';
import '../../styles/pages/chat/Chat.css';
import TabChat from './tabs/chat/TabChat';
import TabCreateEdit from './tabs/createEdit/TabCreateEdit';
import TabTrain from './tabs/train/TabTrain';
import TabConversations from './tabs/conversations/TabConversations';
import TabDesign from './tabs/design/TabDesign';
import TabAnalytics from './tabs/analytics/TabAnalytics';
import TabIntegration from './tabs/integrations/TabIntegration';
import TabKnowledgeBase from './tabs/knowledgeBase/TabKnowledgeBase';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import SelectChatBot from './tabs/selectChatBot/SelectChatBot';
import { RootState } from '../../redux/store/store';

const Chat: React.FC = () => {
  const { rex_user_auth } = useSelector(({ auth }: any) => auth);
  const { rex_chat_selecccionado } = useSelector(({ home }: RootState) => home);
  const listTabs = [
    { icon: RobotOutlined, title: 'CHATBOTS', component: <SelectChatBot />, key: '1', slug: 'show.module.chats.select-chat' },
    { icon: WechatOutlined, title: 'CHAT', component: <TabChat />, key: '2', slug: 'show.module.chats.chat' },
    { icon: WechatWorkOutlined, title: 'EDITAR', component: <TabCreateEdit />, key: '3', slug: 'show.module.chats.edit' },
    { icon: SlidersOutlined, title: 'ENTRENAR', component: <TabTrain />, key: '4', slug: 'show.module.chats.train' },
    { icon: UsbTwoTone, title: 'BASE DE CONOCIMIENTOS', component: <TabKnowledgeBase />, key: '5', slug: 'show.module.chats.knowledge-base' },
    { icon: OrderedListOutlined, title: 'CONVERSACIONES', component: <TabConversations />, key: '6', slug: 'show.module.chats.conversations' },
    { icon: FormatPainterOutlined, title: 'DISEÑO', component: <TabDesign />, key: '7', slug: 'show.module.chats.design' },
    // { icon: PieChartOutlined, title: 'ANALYTICS', component: <TabAnalytics />, key: '8', slug: 'show.module.chats.analytics' },
    { icon: InteractionOutlined, title: 'INTEGRACIONES', component: <TabIntegration />, key: '9', slug: 'show.module.chats.integrations' },
  ];

  const [activeTabKey, setActiveTabKey] = useState<string>('1');
  const [disabledTabs, setDisabledTabs] = useState<string[]>([]);

  const updateTabs = () => {
    const chatSeleccionado = rex_chat_selecccionado
    setDisabledTabs(chatSeleccionado ? [] : listTabs.map(tab => tab.key));
  };

  useEffect(() => {
    updateTabs();
    const interval = setInterval(updateTabs, 1000);
    return () => clearInterval(interval);
  }, [rex_chat_selecccionado]);

  const handleTabChange = (key: string) => setActiveTabKey(key);

  return (
    <div className="tabs-container">
      <div className="tabs-list">
        {listTabs.map((tab) => {
          let accessTab = rex_user_auth.permisos.some((permiso: any) => permiso.slug === tab.slug);
          return (
            <div
              key={tab.key}
              className={`tab-item ${activeTabKey === tab.key ? 'active' : ''}`}
              onClick={() => accessTab && !disabledTabs.includes(tab.key) && handleTabChange(tab.key)}
            >
              <tab.icon className="tab-icon" />
              {accessTab ? tab.title : <Tooltip title="No access">{tab.title}</Tooltip>}
            </div>
          );
        })}
      </div>
      <div className="tab-content">
        {listTabs.find((tab) => tab.key === activeTabKey)?.component}
      </div>
    </div>
  );
};

export default Chat;
