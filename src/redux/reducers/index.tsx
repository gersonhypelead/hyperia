import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import Home from './home/Home'
import ChatBots from './chatBost/Entrenar/ChatBots';
import TabChat from './chatBost/chat/Chat';
import Conversation from './chatBost/conversation/Conversation'
import Users from './users/Users'
import TiposUsuarios from './tipo_usuarios/TiposUsuarios'
import Auth from './auth/Auth'
import PermisosTipoUsuario from './permissions/PermissionsUsers';
import AuditoriasReducer from './auditorias/Auditorias';

const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  home: Home,
  chatBots: ChatBots,
  tabChat: TabChat,
  conversation: Conversation,
  users: Users,
  tipoUsuarios: TiposUsuarios,
  permisosTiposUsuarios: PermisosTipoUsuario,
  auth: Auth,
  auditorias: AuditoriasReducer
});

export default createRootReducer;
