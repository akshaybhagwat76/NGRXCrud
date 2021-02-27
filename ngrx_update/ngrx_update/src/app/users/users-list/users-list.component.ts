import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {User} from '../Shared/user';
import {AppState} from '../../app-state';
import {Observable} from 'rxjs';

import * as userAction from '../store/users.actions';
import {getAllUsers} from '../store/users.reducer';
import {UsersService} from '../shared/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  title = 'List of User(s)';
  users: Observable<User[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log('... initializing User list component.');
    this.users = this.store.select(getAllUsers);
    console.log("::"+this.users);
  }

   /**
   * Delete the selected User
   */
  delete(id: number) {    
    if (confirm('Are you sure do you want to delete this User?')) {
      this.store.dispatch(new userAction.RemoveUser(id));
    }
  }

}
