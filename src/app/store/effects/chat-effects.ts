import {
  GetAllChatroomMessages,
  GetAllChatroomMessagesFail
} from './../actions/chat-actions';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as chatActions from '../actions/chat-actions';
import {
  map,
  switchMap,
  catchError,
  flatMap,
  first,
  withLatestFrom,
  tap,
  pluck
} from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { TaskModel } from 'src/app/shared/models/tasks.model';

@Injectable()
export class ChatEffects {
  constructor(
    private chatService: ChatroomService,
    private actions$: Actions
  ) {}

  @Effect()
  loadChatrooms$ = this.actions$.ofType(chatActions.GET_CHATROOMS).pipe(
    switchMap(() =>
      this.chatService.chatrooms.pipe(
        tap(() => console.log('EFFECTS')),
        map(data => new chatActions.GetChatroomsSuccess(data)),
        catchError(error => {
          return of(new chatActions.GetChatroomsFail(error));
        })
      )
    )
  );

  @Effect()
  setCurrentChatroom$ = this.actions$
    .ofType(chatActions.SET_CURRENT_CHATROOM)
    .pipe(
      map(action => action['payload']),
      switchMap((id: string) =>
        from(this.chatService.setCurrentChatroom(id)).pipe(
          tap(() => console.log('EFFECTS')),
          map(data => new chatActions.SetCurrentChatroomSuccess(data)),
          catchError(error => {
            return of(new chatActions.SetCurrentChatroomFail(error));
          })
        )
      )
    );

  @Effect()
  getMessages$ = this.actions$.ofType(chatActions.GET_CHATROOM_MESSAGES).pipe(
    map(action => action['payload']),
    switchMap(id =>
      this.chatService.selectedChatroom.pipe(
        map(data => new chatActions.GetAllChatroomMessagesSuccess(data, id)),
        catchError(error => {
          return of(new chatActions.GetAllChatroomMessagesFail(error));
        })
      )
    )
  );
}
