import * as chatActions from '../actions/chat-actions';
import { ChatroomModel, MessageModel } from '../../shared/models/chat-model';


export interface ChatState {

  chatrooms: ChatroomModel[];
  currentChatroom: string;
}

export const  innitialState: ChatState = {

  chatrooms: [],
  currentChatroom: ''
};

export function reducer(state: ChatState = innitialState, action: chatActions.ChatActions): ChatState {

  switch(action.type) {

    default: {
      return state;
    }
  }
}
