import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import Home from './home/Home'
import ChatBots from './chatBost/Entrenar/ChatBots';
import TabChat from './chatBost/chat/Chat';
import Conversation from './chatBost/conversation/Conversation'
import Users from './users/Users'
import TiposUsuarios from './tipo_usuarios/TiposUsuarios'
import Auth from './auth/Auth'
import ValidateCode from './auth/ValidateCode';
import PermisosTipoUsuario from './permissions/PermissionsUsers';
import AuditoriasReducer from './auditorias/Auditorias';
import ChatsBotsHorario from './Horario/ChatBotsHorario';
import Admin from './admin/Admin';
import Desing from './chatBost/desingChat/ChatDesign';
import Planes from './planes/Planes';
import PaquetesMensajes from './paquetes_mensajes/PaquetesMensajes';
import PaquetesUsuarios from './paquetes_usuarios/PaquetesUsuarios';
import updateTimezoneReducer from './update_timezone/Update_timezone';
import analytics from './analytics/analytics';

const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  admin: Admin,
  home: Home,
  chatBots: ChatBots,
  tabChat: TabChat,
  conversation: Conversation,
  users: Users,
  tipoUsuarios: TiposUsuarios,
  permisosTiposUsuarios: PermisosTipoUsuario,
  auditorias: AuditoriasReducer,
  chatsbotsHorario: ChatsBotsHorario,
  auth: Auth,
  planes:Planes,
  design:Desing,
  paquetesMensajes: PaquetesMensajes,
  paquetesUsuarios: PaquetesUsuarios,
  updateTimezone: updateTimezoneReducer,
  analytics: analytics,
  validateCode: ValidateCode
});

export default createRootReducer;
