import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from '../pages/chat/Chat';
import AdmChat from '../pages/admin/AdminChat';
import Home from '../pages/home/Home';
import OurChats from '../pages/ourChats/OurChats';
import Pricing from '../pages/pricing/Pricing';
import Login from '../pages/login/Login';
import LayoutWithSidebar from '../helpers/LayoutWithSidebar';
import Register from '../pages/register/Register';
import ProtectedRoute from './ProtectedRoute';
import GoogleCallback from './../auth/googleCallback'
import Users from '../pages/admin/users/Users';
import TypeUsersChat from '../pages/admin/typesUsers/TypesUsers';
import PermisosPage from '../components/pages/admin/typeUsers/PermissionsTypeUser';
import Profile from '../pages/user/Profile';
import MySubscription from '../pages/user/MySubscription';
import CreateChatBot from '../pages/create-chatbot/Create-chatbot';
import Planes from '../pages/planes/planes';
import Chatv2 from '../pages/chatv2/Chatv2';
import BigChatComponent from '../components/chat/BigChatComponent';
import PaquetesMensajes from '../pages/paquetes-mensajes/paquetes-mensajes';
import FacebookIntegration from '../pages/chat/tabs/integrations/FacebookIntegration';
import WhatsappIntegration from '../pages/chat/tabs/integrations/WhatsappIntegration';
import Checkout from '../pages/checkout/checkout';
import Embedded from '../pages/embedded/Embedded';
import WebIntegration from '../pages/chat/tabs/integrations/WebIntegration';
import TableOne from '../components/table/TableOne';
import Table from '../pages/prueba/Table';
import Analytics from '../pages/analytics/Analytics';
import ValidateCode from '../pages/validateCode/ValidateCode'

const AppRoutes: React.FC = () => {

  return (
    // <Router>
    <Routes>
      <Route path="/big-chat-component/:botid/:userid" element={<BigChatComponent embedded={true} />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<LayoutWithSidebar />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/crear-chatbot" element={<CreateChatBot />} />

          <Route path="/chats" element={<Chat />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/chats/integracion-facebook" element={<FacebookIntegration />} />
          <Route path="/chats/integracion-whatsapp" element={<WhatsappIntegration />} />

          <Route path="/chats/integracion-web" element={<WebIntegration />} />

          <Route path="/chatsv2" element={<Chatv2 />} />
          <Route path="/administrador" element={<AdmChat />} />
          <Route path="/nuestros-chats" element={<OurChats />} />
          <Route path="/precios" element={<Pricing />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/tipos-usuarios" element={<TypeUsersChat />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/tipos-usuarios/:tipoUsuarioId/permisos" element={<PermisosPage />} />
          <Route path='/paquetes-mensajes' element={<PaquetesMensajes />} />
          <Route path='/prueba' element={<Table />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<MySubscription />} />
          <Route path="/checkout" element={<Checkout />} />


          {/* <Route path="*" element={<Chat />} /> */}
          <Route path="*" element={<Home />} />

        </Route>
      </Route>

      <Route path="*" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/validateCode" element={<ValidateCode />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />

      <Route path="/embedded/chatbot/:token" element={<Embedded />} />
    </Routes>
    // </Router>
  );
};

export default AppRoutes;
