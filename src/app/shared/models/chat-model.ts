import { PeoplesModel } from "./peoples.model";

export interface MessageModel {

  createdAt?: string;
  message?: string;
  sender?: PeoplesModel;
}


export interface ChatroomModel {
  owner: string;
  unread: boolean;
  user: PeoplesModel;
}
