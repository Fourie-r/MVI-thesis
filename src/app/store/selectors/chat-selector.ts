import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromChat from '../reducers/chat-reducer';

export const getChatModule = createSelector(
  fromFeature.getModulesState,
  (state: fromFeature.ModulesState) => state.chat
);

export const getAllChatrooms = createSelector(
  getChatModule,
  fromChat.getChatroomList
);

export const getAllMessages = createSelector(
  getChatModule,
  fromChat.getMessages
);

export const getCurrentChatroomString = createSelector(
  getChatModule,
  fromChat.getCurrentChatroom
);

export const getChatrooms = () =>
  createSelector(
    getAllChatrooms,
    data => {
      return data;
    }
  );

export const getMessages = () =>
  createSelector(
    getAllMessages,
    data => {
      return data;
    }
  );

export const getCurrentChatroom = () =>
  createSelector(
    getCurrentChatroomString,
    data => {
      return data;
    }
  );
