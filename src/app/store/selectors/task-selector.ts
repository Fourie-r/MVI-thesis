import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromTasks from '../reducers/task-reducer';

export const getTasksModule = createSelector(fromFeature.getModulesState, (state: fromFeature.ModulesState) => state.tasks);

export const getAllTasks = createSelector(
  getTasksModule,
  fromTasks.getTasks
);

export const getAllBacklogTasks = createSelector(
  getTasksModule,
  fromTasks.getBacklog
)

export const getTasksArr = () => createSelector(
    getAllTasks,
    data => {
      return data;
    }
  );

export const getBacklogArr = () => createSelector(
  getAllBacklogTasks,
    data => {
      return data;
    }
  );
