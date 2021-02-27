 import * as fromuser from './users/store/users.reducer';


export interface AppState {
  users: fromuser.State;  
}
