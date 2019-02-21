import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as taskActions from '../actions';
import { map, switchMap, catchError, flatMap, first, withLatestFrom, tap, pluck } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TaskService } from '../../services/task.service';
import { TaskModel } from 'src/app/shared/models/tasks.model';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()
export class TaskEffect {

  constructor(private taskService: TaskService, private actions$: Actions) {}

  @Effect()
  loadTasks$ = this.actions$.ofType(taskActions.GET_TASKS).pipe(
    switchMap(() => this.taskService.getTasks().pipe(
      tap(() => console.log('EFFECTS')),
      map(data => new taskActions.GetTasksSuccess(data)),
      catchError(error => {
        return of(new taskActions.GetTasksFail(error));
      })
    ))
  );

  @Effect()
  loadBacklog$ = this.actions$.ofType(taskActions.GET_BACKLOG_TASKS).pipe(
    switchMap(() => this.taskService.getBacklogTasks().pipe(
      tap(() => console.log('EFFECTS')),
      map(data => new taskActions.GetBacklogTasksSuccess(data)),
      catchError(error => {
        return of(new taskActions.GetTasksFail(error));
      })
    ))
  );


  @Effect()
  moveToBacklog$ = this.actions$.ofType(taskActions.MOVE_TO_BACKLOG).pipe(
    map(action => action['payload']),
    switchMap((action: TaskModel) => this.taskService.moveToBacklog(action).then(res => new taskActions.MoveToBacklogSuccess(action))),
      catchError(error => {
        return of(new taskActions.MoveToBacklogFail(error));
      })
  );


  @Effect()
  moveToSprint$ = this.actions$.ofType(taskActions.MOVE_TASK_TO_SPRINT).pipe(
    map(action => action['payload']),
    switchMap((action: TaskModel) => this.taskService.moveToSprint(action).then(res => new taskActions.MoveTaskToSprintSuccess(action))),
      catchError(error => {
        return of(new taskActions.MoveTaskToSprintFail(error));
      })
  );


  @Effect()
  createTask$ = this.actions$.ofType(taskActions.CREATE_TASK).pipe(
    tap((action) => console.log(action)),
    map(action => action['payload']),
    switchMap((action: TaskModel) => this.taskService.addTasks(action).then(res => new taskActions.CreateTaskSuccess(action))),
      catchError(error => {
        return of(new taskActions.MoveTaskToSprintFail(error));
      })
  );
}
