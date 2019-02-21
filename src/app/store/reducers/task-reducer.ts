import * as taskActions from '../actions/task-actions';
import { TaskModel } from 'src/app/shared/models/tasks.model';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface TaskState {
  tasks: TaskModel[];
  backlog: TaskModel[];
}

export const innitialState: TaskState = {
  tasks: [],
  backlog: []
};

export function reducer(
  state: TaskState = innitialState,
  action: taskActions.TaskActions
): TaskState {
  console.log(action);
  switch (action.type) {

    case taskActions.CREATE_TASK_FAIL:
    case taskActions.MOVE_TO_BACKLOG_FAIL:
    case taskActions.REMOVE_TASK_FAIL:
    case taskActions.REMOVE_TASK_FROM_BACKLOG_FAIL:
    case taskActions.GET_BACKLOG_TASKS_FAIL:
    case taskActions.GET_TASKS_FAIL: {
      console.log(action.payload);
      return {...state};
    }

     case taskActions.CREATE_TASK:
    case taskActions.GET_BACKLOG_TASKS:
    case taskActions.MOVE_TO_BACKLOG:
    case taskActions.REMOVE_TASK:
    case taskActions.REMOVE_TASK_FROM_BACKLOG:
    case taskActions.GET_TASKS: {
      console.log(action.type);
      return {...state};
    }

    case taskActions.GET_TASKS_SUCCESS: {
      console.log('Reducer TAsks action success');
      const newState = { ...state, tasks: action.payload };
      console.log(newState);
      return newState;
    }

    case taskActions.CREATE_TASK_SUCCESS: {
      console.log(action.type);
      const newTaskArr = state.tasks;
      newTaskArr.push(action.payload);

      return {...state, tasks: newTaskArr};
    }

    case taskActions.GET_BACKLOG_TASKS_SUCCESS: {
      console.log('Reducer BacklogTasks action success');

      const newState = { ...state, backlog: action.payload};
      console.log(newState);

      return newState;
    }

    case taskActions.MOVE_TO_BACKLOG_SUCCESS: {

      const newState = {...state};
      newState.tasks.forEach(task => {
        if ( task.id === action.payload.id) {
          newState.backlog.push(task);
        }
      });
      newState.tasks = newState.tasks.filter(task => task.id !== action.payload.id);
      console.log(newState);
      return newState;
    }

    case taskActions.MOVE_TASK_TO_SPRINT: {

      const newState = {...state};
      const backlogs = state.backlog;
      newState.backlog.forEach(task => {
        if ( task.id === action.payload.id) {
          newState.tasks.push(task);
        }
      });
      newState.backlog = newState.backlog.filter(task => task.id !== action.payload.id);
      console.log(newState);
      return newState;
    }





    default: {
      return state;
    }
  }
}
export const getTasks = (state: TaskState) => state.tasks;
export const getBacklog = (state: TaskState) => state.backlog;
