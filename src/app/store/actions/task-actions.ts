import { Action } from '@ngrx/store';
import { TaskModel } from 'src/app/shared/models/tasks.model';

export const GET_TASKS = 'TASKS Get tasks';
export const GET_TASKS_SUCCESS = 'Tasks Get tasks success';
export const GET_TASKS_FAIL = 'Tasks Get tasks fail';

export const GET_BACKLOG_TASKS = 'Tasks Get Backlogtasks';
export const GET_BACKLOG_TASKS_FAIL = 'Tasks Get Backlogtasks fail';
export const GET_BACKLOG_TASKS_SUCCESS = 'Tasks Get Backlogtasks success';

export const REMOVE_TASK = 'TASKS remove task';
export const REMOVE_TASK_SUCCESS = 'TASKS remove task SUCCESS';
export const REMOVE_TASK_FAIL = 'TASKS remove task FAIL';

export const UPDATE_TASK = 'TASKS update task';

export const MOVE_TO_BACKLOG = 'TASKS move to backlog';
export const MOVE_TO_BACKLOG_FAIL = 'TASKS move to backlog fail';
export const MOVE_TO_BACKLOG_SUCCESS = 'TASKS move to backlog success';

export const MOVE_TASK_TO_SPRINT = 'TASKS move task to sprint';
export const MOVE_TASK_TO_SPRINT_FAIL = 'TASKS move task to sprint fail';
export const MOVE_TASK_TO_SPRINT_SUCCESS = 'TASKS move task to sprint success';

export const CREATE_TASK = 'TASKS create a task';
export const CREATE_TASK_FAIL = 'TASKS create a task fail';
export const CREATE_TASK_SUCCESS = 'TASKS create a task success';

export const REMOVE_TASK_FROM_BACKLOG = 'TASKS remove task from backlog';
export const REMOVE_TASK_FROM_BACKLOG_FAIL =
  'TASKS remove task from backlog fail';
export const REMOVE_TASK_FROM_BACKLOG_SUCCESS =
  'TASKS remove task from backlog success';

export class GetTasks implements Action {
  readonly type = GET_TASKS;
}
export class GetTasksFail implements Action {
  readonly type = GET_TASKS_FAIL;
  constructor(public payload: any) {}
}

export class GetTasksSuccess implements Action {
  readonly type = GET_TASKS_SUCCESS;
  constructor(public payload: TaskModel[]) { }
}

export class GetBacklogTasks implements Action {
  readonly type = GET_BACKLOG_TASKS;
}

export class GetBacklogTasksFail implements Action {
  readonly type = GET_BACKLOG_TASKS_FAIL;
  constructor(public payload: any) {}
}

export class GetBacklogTasksSuccess implements Action {
  readonly type = GET_BACKLOG_TASKS_SUCCESS;
  constructor(public payload: TaskModel[]) {}
}

export class RemoveTask implements Action {
  readonly type = REMOVE_TASK;
}
export class RemoveTaskFail implements Action {
  readonly type = REMOVE_TASK_FAIL;
  constructor(public payload: any) {}
}

export class RemoveTaskSuccess implements Action {
  readonly type = REMOVE_TASK_SUCCESS;
  constructor(public payload: string) {}
}

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;
  constructor(public id: string, public status: string) {}
}

export class MoveToBacklog implements Action {
  readonly type = MOVE_TO_BACKLOG;
  constructor(public payload: TaskModel) {}
}

export class MoveToBacklogSuccess implements Action {
  readonly type = MOVE_TO_BACKLOG_SUCCESS;
  constructor(public payload: TaskModel) {}
}

export class MoveToBacklogFail implements Action {
  readonly type = MOVE_TO_BACKLOG_FAIL;
  constructor(public payload: any) {}
}

export class CreateTask implements Action {
  readonly type = CREATE_TASK;
  constructor(public payload: TaskModel) {}
}

export class CreateTaskSuccess implements Action {
  readonly type = CREATE_TASK_SUCCESS;
  constructor(public payload: TaskModel) {}
}

export class CreateTaskFail implements Action {
  readonly type = CREATE_TASK_FAIL;
  constructor(public payload: any) {}
}

export class RemoveTaskFromBacklog implements Action {
  readonly type = REMOVE_TASK_FROM_BACKLOG;
}

export class RemoveTaskFromBacklogFail implements Action {
  readonly type = REMOVE_TASK_FROM_BACKLOG_FAIL;
  constructor(public payload: any) {}
}

export class RemoveTaskFromBacklogSuccess implements Action {
  readonly type = REMOVE_TASK_FROM_BACKLOG_SUCCESS;
  constructor(public payload: string) {}
}

export class MoveTaskToSprint implements Action {

  readonly type = MOVE_TASK_TO_SPRINT;
  constructor(public payload: TaskModel) {}
}

export class MoveTaskToSprintFail implements Action {

  readonly type = MOVE_TASK_TO_SPRINT_FAIL;
  constructor(public payload: any) {}
}

export class MoveTaskToSprintSuccess implements Action {

  readonly type = MOVE_TASK_TO_SPRINT_SUCCESS;
  constructor(public payload: TaskModel) {}
}

export type TaskActions =
  | GetTasks
  | GetTasksSuccess
  | GetTasksFail
  | GetBacklogTasks
  | GetBacklogTasksFail
  | GetBacklogTasksSuccess
  | RemoveTask
  | RemoveTaskFail
  | RemoveTaskSuccess
  | UpdateTask
  | MoveToBacklog
  | MoveToBacklogSuccess
  | MoveToBacklogFail
  | CreateTask
  | CreateTaskFail
  | CreateTaskSuccess
  | RemoveTaskFromBacklog
  | RemoveTaskFromBacklogFail
  | MoveTaskToSprint
  | MoveTaskToSprintFail
  | MoveTaskToSprintSuccess
  | RemoveTaskFromBacklogSuccess;
