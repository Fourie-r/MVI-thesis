import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as taskActions from '../actions';
import { map, switchMap, catchError, flatMap, first, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TaskService } from '../../services/task.service';

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
}
