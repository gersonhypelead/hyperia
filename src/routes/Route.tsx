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
import UserProfile from '../components/pages/user/PerfilUser';
import TypeUsersChat from '../pages/admin/typesUsers/TypesUsers';
import PermisosPage from '../components/pages/admin/typeUsers/PermissionsTypeUser';


const AppRoutes: React.FC = () => {
  return (
    // <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutWithSidebar />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chats" element={<Chat />} />
            <Route path="/administrador" element={<AdmChat />} />
            <Route path="/nuestros-chats" element={<OurChats />} />
            <Route path="/precios" element={<Pricing />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/tipos-usuarios" element={<TypeUsersChat />} />
            <Route path="/tipos-usuarios/:tipoUsuarioId/permisos" element={<PermisosPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<Chat />} />
            <Route path="*" element={<Home />} />
          
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
      </Routes>
    // </Router>
  );
};

export default AppRoutes;
