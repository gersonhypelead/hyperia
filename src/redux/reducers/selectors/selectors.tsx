import { RootState } from "../../store/store";

export const selectChatSeleccionado = (state: RootState) => state.home.rex_chat_selecccionado;
export const selectConversacionSeleccionada = (state: RootState) => state.home.rex_conversacion_seleccionada;
export const selectSupportConversacionSeleccionado = (state: RootState) => state.home.rex_support_seleccionado;
export const selectTokenChatSeleccionado = (state: RootState) => state.home.rex_token_chat;
