import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromTasks from './task-reducer';


export interface ModulesState {
  tasks: fromTasks.TaskState;
}

export const reducers: ActionReducerMap<ModulesState> = {
  tasks: fromTasks.reducer
};


export const getModulesState = createFeatureSelector<ModulesState>('modules');
