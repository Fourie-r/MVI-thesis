import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromTasks from './task-reducer';
import * as fromChat from './chat-reducer';

export interface ModulesState {
  tasks: fromTasks.TaskState;
  chat: fromChat.ChatState;

}

export const reducers: ActionReducerMap<ModulesState> = {
  tasks: fromTasks.reducer,
  chat: fromChat.reducer
};


export const getModulesState = createFeatureSelector<ModulesState>('modules');
