import * as UserActions from './users.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { AppAction } from 'src/app/app.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../Shared/user';


export const usersFeatureKey = 'users';

export interface State {
  data: User[];
  selected: User;
  action: string;
  done: boolean;
  error?: Error;
}

export const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null
};


export function reducer(state = initialState, action: AppAction): State {
  console.log(action.type);
  switch (action.type) {

    /*************************
    * GET all user actions
    ************************/
    case UserActions.GET_USERS:
      return {
        ...state,
        action: UserActions.GET_USERS,
        done: false,
        selected: null,
        error: null
      };
    case UserActions.GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case UserActions.GET_USERS_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };
    /*************************
   * GET user by id actions
   ************************/
    case UserActions.GET_USER:
      return {
        ...state,
        action: UserActions.GET_USER,
        done: false,
        selected: null,
        error: null
      };
    case UserActions.GET_USER_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case UserActions.GET_USER_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
    /*************************
   * CREATE User actions
   ************************/
    case UserActions.CREATE_USER:
      return {
        ...state,
        selected: action.payload,
        action: UserActions.CREATE_USER,
        done: false,
        error: null
      };
    case UserActions.CREATE_USER_SUCCESS:
      {
        const newUser = {
          ...state.selected,
          id: action.payload
        };
        const data = [
          ...state.data,
          newUser
        ];
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case UserActions.CREATE_USER_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
    /*************************
  * UPDATE User actions
  ************************/
    case UserActions.UPDATE_USER:
      return {
        ...state,
        selected: action.payload,
        action: UserActions.UPDATE_USER,
        done: false,
        error: null
      };
    case UserActions.UPDATE_USER_SUCCESS:
      {
        const index = state
          .data
          .findIndex(h => h.id === state.selected.id);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            done: true,
            selected: null,
            error: null
          };
        }
        return state;
      }
    case UserActions.UPDATE_USER_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

    /*************************
  * DELETE User actions
  ************************/
    case UserActions.DELETE_USER:
      {
        const selected = state.data.find(u => u.id === action.payload);
        return {
          ...state,
          selected,
          action: UserActions.DELETE_USER,
          done: false,
          error: null
        };
      }
    case UserActions.DELETE_USER_SUCCESS:
      {
        const data = state.data.filter(u => u.id !== state.selected.id);
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case UserActions.DELETE_USER_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getUserState = createFeatureSelector<State>('users');

export const getAllUsers = createSelector(getUserState, (state: State) => state.data);

export const getUsersError = createSelector(getUserState, (state: State) => {
  return state.action === UserActions.GET_USERS
    ? state.error
    : null;
});

export const getUser = createSelector(getUserState, (state: State) => {
  if (state.action === UserActions.GET_USER && state.done) {
    return state.selected;
  } else {
    return null;
  }

});
export const isCreated = createSelector(getUserState, (state: State) =>
  state.action === UserActions.CREATE_USER && state.done && !state.error);

export const getCreateError = createSelector(getUserState, (state: State) => {
  return state.action === UserActions.CREATE_USER
    ? state.error
    : null;
});
export const getuserError = createSelector(getUserState, (state: State) => {
  return state.action === UserActions.GET_USER
    ? state.error
    : null;
});

export const isUpdated = createSelector(getUserState, (state: State) =>
  state.action === UserActions.UPDATE_USER && state.done && !state.error);

export const getUpdateError = createSelector(getUserState, (state: State) => {
  return state.action === UserActions.UPDATE_USER
    ? state.error
    : null;
});

export const isDeleted = createSelector(getUserState, (state: State) =>
  state.action === UserActions.DELETE_USER && state.done && !state.error);

export const getDeleteError = createSelector(getUserState, (state: State) => {
  return state.action === UserActions.DELETE_USER_ERROR
    ? state.error
    : null;
});