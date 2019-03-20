import * as chatActions from '../actions/chat-actions';
import { ChatroomModel, MessageModel } from '../../shared/models/chat-model';


export interface ChatState {

  chatrooms: ChatroomModel[];
  currentChatroom: string;
  messages: [{ id: string,
              messages: MessageModel[]  }]
}

export const  innitialState: ChatState = {

  chatrooms: [],
  currentChatroom: '',
  messages: [{ id: '',
    messages: []}]
};

// Chat reducer
export function reducer(state: ChatState = innitialState, action: chatActions.ChatActions): ChatState {

  switch (action.type) {

    case chatActions.GET_CHATROOMS_FAIL:
    case chatActions.SET_CURRENT_CHATROOM_FAIL:
    case chatActions.GET_CHATROOM_MESSAGES_FAIL: {
      console.log(action.payload);
      return state;
    }


    case chatActions.GET_CHATROOMS_SUCCESS: {

      const newState = {...state};
      newState.chatrooms = action.payload;

      return newState;
    }
    case chatActions.GET_CHATROOM_MESSAGES_SUCCESS: {

      const newState = {...state};

      newState.messages.concat({ id: action.id, messages: action.payload });
      return newState;
    }

    case chatActions.SET_CURRENT_CHATROOM_SUCCESS : {

      const newState = {...state};
      newState.currentChatroom = action.payload;

      return newState;
    }

    default: {
      return state;
    }
  }
}

export const getMessages = (state: ChatState) => state.messages;
export const getCurrentChatroom = (state: ChatState) => state.currentChatroom;
export const getChatroomList = (state: ChatState) => state.chatrooms;
