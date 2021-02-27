import { Action, props } from '@ngrx/store';
import { User } from '../Shared/user';

export const GET_USERS = '[ALL] User';
export const GET_USERS_SUCCESS = '[ALL] User Success';
export const GET_USERS_ERROR = '[ALL] User Error';

export const GET_USER = '[GET] User';
export const GET_USER_SUCCESS = '[GET] User Success';
export const GET_USER_ERROR = '[GET] User Error';

export const CREATE_USER = '[CREATE] User';
export const CREATE_USER_SUCCESS = '[CREATE] User Success';
export const CREATE_USER_ERROR = '[CREATE] User Error';

export const DELETE_USER = '[DELETE] User';
export const DELETE_USER_SUCCESS = '[DELETE] User Success';
export const DELETE_USER_ERROR = '[DELETE] User Error';

export const UPDATE_USER = '[UPDATE] User';
export const UPDATE_USER_SUCCESS = '[UPDATE] User Success';
export const UPDATE_USER_ERROR = '[UPDATE] User Error';

export const UPDATE_USER_BY_ID = '[UPDATEBYID] USER_BY_ID';
export const UPDATE_USER_BY_ID_SUCCESS = '[UPDATEBYID] USER_BY_ID Success';
export const UPDATE_USER_BY_ID_ERROR = '[UPDATEBYID] USER_BY_ID Error';


/****************************************
 * GET all the Users
 ****************************************/
export class GetAllUsers implements Action {
  readonly type = GET_USERS;
}

export class GetAllUsersSuccess implements Action {
  readonly type = GET_USERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class GetAllUsersError implements Action {
  readonly type = GET_USERS_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * GET User by id
 ****************************************/
export class GetUser implements Action {
  readonly type = GET_USER;

  constructor(public payload: number) {
  }
}

export class GetUserSuccess implements Action {
  readonly type = GET_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class GetUserError implements Action {
  readonly type = GET_USER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD new game
 ****************************************/
export class AddUser implements Action {
  readonly type = CREATE_USER;
 
  constructor(public payload: User) {
    //console.log(payload);
  }
}

export class AddUserSuccess implements Action {
  readonly type = CREATE_USER_SUCCESS;

  constructor(public payload: number) {
  }
}

export class AddUserError implements Action {
  readonly type = CREATE_USER_ERROR;

  constructor(public payload: Error) {
    console.log("Test user ------->"+payload);
  }
}

/****************************************
 * REMOVE a game by id
 ****************************************/
export class RemoveUser implements Action {
  readonly type = DELETE_USER;

  constructor(public payload: number) {
   
  }
}

export class RemoveUserSuccess implements Action {
  readonly type = DELETE_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class RemoveUserError implements Action {
  readonly type = DELETE_USER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * UPDATE User by id
 ****************************************/
export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {
  }
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS
}

export class UpdateUserError implements Action {
  readonly type = UPDATE_USER_ERROR;

  constructor(public payload: Error) {
  }
}


export class UpdateUserById implements Action {
  readonly type = UPDATE_USER_BY_ID;

  constructor(public payload: User) {
  }
}

export class UpdateUserByIdSuccess implements Action {
  readonly type = UPDATE_USER_BY_ID_SUCCESS
}

export class UpdateUserByIdError implements Action {
  readonly type = UPDATE_USER_BY_ID_ERROR;

  constructor(public payload: Error) {
  }
}
