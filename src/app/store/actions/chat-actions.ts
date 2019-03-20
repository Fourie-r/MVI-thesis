import { Action } from '@ngrx/store';
import { ChatroomModel, MessageModel } from '../../shared/models/chat-model';

export const CREATE_MESSAGE = 'Messages create message';

export const GET_CHATROOMS = 'Messages get all chatrooms';
export const GET_CHATROOMS_SUCCESS = 'Messages get all chatrooms success';
export const GET_CHATROOMS_FAIL = 'Messages get all chatrooms fail';

export const SET_CURRENT_CHATROOM = 'Messages set current chatroom';
export const SET_CURRENT_CHATROOM_SUCCESS = 'Messages set current chatroom Success';
export const SET_CURRENT_CHATROOM_FAIL = 'Messages set current chatroom fail';
export const GET_CHATROOM_MESSAGES = 'Messages get all chatroom messages';
export const GET_CHATROOM_MESSAGES_SUCCESS = 'Messages get all chatroom messages success';
export const GET_CHATROOM_MESSAGES_FAIL = 'Messages get all chatroom messages fail';


export class CreateMessage implements Action {
  readonly type = CREATE_MESSAGE;
  constructor(public payload: MessageModel) {}
}

export class GetChatrooms implements Action {
  readonly type = GET_CHATROOMS;
}

export class GetChatroomsSuccess implements Action {
  readonly type = GET_CHATROOMS_SUCCESS;
  constructor(public payload: ChatroomModel[]) {}
}

export class GetChatroomsFail implements Action {
  readonly type = GET_CHATROOMS_FAIL;
  constructor(public payload: any) {}
}

export class SetCurrentChatroom implements Action {
  readonly type = SET_CURRENT_CHATROOM;
  constructor(public payload: string) {}
}
export class SetCurrentChatroomSuccess implements Action {
  readonly type = SET_CURRENT_CHATROOM_SUCCESS;
  constructor(public payload: string) {}
}
export class SetCurrentChatroomFail implements Action {
  readonly type = SET_CURRENT_CHATROOM_FAIL;
  constructor(public payload: any) {}
}

export class GetAllChatroomMessages implements Action {
  readonly type = GET_CHATROOM_MESSAGES;
  constructor(public payload: string) {}
}

export class GetAllChatroomMessagesSuccess implements Action {
  readonly type = GET_CHATROOM_MESSAGES_SUCCESS;
  constructor(public payload: MessageModel[], public id: string) {}
}

export class GetAllChatroomMessagesFail implements Action {
  readonly type = GET_CHATROOM_MESSAGES_FAIL;
  constructor(public payload: any) {}
}

export type ChatActions =
  | CreateMessage
  | GetChatrooms
  | GetChatroomsFail
  | GetChatroomsSuccess
  | SetCurrentChatroom
  | SetCurrentChatroomSuccess
  | SetCurrentChatroomFail
  | GetAllChatroomMessages
  | GetAllChatroomMessagesSuccess
  | GetAllChatroomMessagesFail;
