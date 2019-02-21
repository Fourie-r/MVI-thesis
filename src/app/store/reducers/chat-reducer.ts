import * as chatActions from '../actions/chat-actions';
import { ChatroomModel, MessageModel } from '../../shared/models/chat-model';


export interface ChatState {

  chatrooms: ChatroomModel[];
  currentChatroom: string;
}

