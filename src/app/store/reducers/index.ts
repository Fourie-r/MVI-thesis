import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromTasks from './task-reducer';
import * as fromChat from './chat-reducer';


// abstract store model composed of two different state slices
export interface ModulesState {
  tasks: fromTasks.TaskState;
  chat: fromChat.ChatState;

}

// top level reducer providing further abstraction and modulizing the app state
export const reducers: ActionReducerMap<ModulesState> = {
  tasks: fromTasks.reducer,
  chat: fromChat.reducer
};


export const getModulesState = createFeatureSelector<ModulesState>('modules');
