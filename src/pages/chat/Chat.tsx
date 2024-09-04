import React, { Component } from 'react';
import { 
  WechatOutlined, WechatWorkOutlined, SlidersOutlined, FormatPainterOutlined, InteractionOutlined, PieChartOutlined,
  OrderedListOutlined, UsbTwoTone 
} from '@ant-design/icons';
import { Tabs } from 'antd';
import TabChat from './tabs/chat/TabChat';
import TabCreateEdit from './tabs/createEdit/TabCreateEdit';
import TabTrain from './tabs/train/TabTrain';
import TabConversations from './tabs/conversations/TabConversations';
import TabDesign from './tabs/design/TabDesign';
import TabAnalytics from './tabs/analytics/TabAnalytics';
import TabIntegration from './tabs/integrations/TabIntegration';
import TabKnowledgeBase from './tabs/knowledgeBase/TabKnowledgeBase';

const listTabs = [
  {
    icon : WechatOutlined,
    title: 'CHAT',
    component: <TabChat />
  },
  {
    icon : WechatWorkOutlined,
    title: 'CREAR & EDITAR',
    component: <TabCreateEdit />
  },
  {
    icon : SlidersOutlined,
    title: 'ENTRENAR',
    component: <TabTrain />
  },
  {
    icon : UsbTwoTone,
    title: 'BASE DE CONOCIMIENTOS',
    component: <TabKnowledgeBase />
  },
  {
    icon : OrderedListOutlined,
    title: 'CONVERSACIONES',
    component: <TabConversations />
  },
  {
    icon : FormatPainterOutlined,
    title: 'DISEÑO',
    component: <TabDesign />
  },
  {
    icon : PieChartOutlined,
    title: 'ANALYTICS',
    component: <TabAnalytics />
  },
  {
    icon : InteractionOutlined,
    title: 'INTEGRACIONES',
    component: <TabIntegration />
  },
]

const Chat: React.FC = () => {
  return (
    <Tabs
      defaultActiveKey={
        // localStorage.getItem("chat_seleccionado") ? "1" : "2"
        "2"
      }
      items={listTabs.map((Tab, i) => {
        const id = String(i + 1);
        return {
          key: id,
          label: Tab.title,
          children: Tab.component,
          icon: <Tab.icon />,
        };
      })}
      tabBarStyle={{
        background: 'white',
        padding: '20px',
        borderRadius: '50px', 
        justifyContent:'center',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(12, 12, 12, 0.2)'
      }}
    />
  );
};

export default Chat;
