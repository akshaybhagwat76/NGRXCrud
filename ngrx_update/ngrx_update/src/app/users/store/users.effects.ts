import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as UserActions from './users.actions';
import {
  AddUser,
  AddUserError,
  AddUserSuccess,
  GetAllUsersError,
  GetAllUsersSuccess,
  GetUser,
  GetUserError,
  GetUserSuccess,
  RemoveUser,
  RemoveUserError,
  RemoveUserSuccess,
  UpdateUser,
  UpdateUserError,
  UpdateUserSuccess
} from './users.actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { UsersService } from '../Shared/users.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../shared/user';

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions,
    private svc: UsersService) {

  }
  @Effect()
  getAllusers$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.GET_USERS),
    switchMap(() => this.svc.findAll()),
    map(users => new GetAllUsersSuccess(users)),
    catchError((err) =>[new GetAllUsersError(err)])
  );


  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(UserActions.GET_USER),
    map((action: GetUser) => action.payload),
    switchMap(id => this.svc.findById(id)),
    map(users => new GetUserSuccess(users)),
    catchError((err) => [new GetUserError(err)])
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType(UserActions.UPDATE_USER),
    map((action: UpdateUser) => action.payload),
    switchMap(users => this.svc.update(users)),
    map(() => new UpdateUserSuccess()),
    catchError((err) => [new UpdateUserError(err)])
  );

  @Effect()
  createusers$ = this.actions$.pipe(
    ofType(UserActions.CREATE_USER),
    map((action: AddUser) => action.payload),
    switchMap(newuser => this.svc.insert(newuser)),
    map((response) => new AddUserSuccess(1)),
    catchError((err) => [new AddUserError(err)])
  );

  @Effect()
  removeusers$ = this.actions$.pipe(
    ofType(UserActions.DELETE_USER),
    map((action: RemoveUser) => action.payload),
    switchMap(id => this.svc.delete(id)),
    map((users: User) => new RemoveUserSuccess(users)),
    catchError((err) => [new RemoveUserError(err)])
  );

}
