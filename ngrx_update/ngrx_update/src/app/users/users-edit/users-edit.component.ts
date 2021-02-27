import {Component, OnInit} from '@angular/core';
import {User} from '../shared/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../app-state';
import {Store} from '@ngrx/store';

import * as UserActions from '../store/users.actions';
import {GetUser, UpdateUser} from '../store/users.actions';
import {getUser} from '../store/users.reducer';


@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  title = 'User Edit';
  users: User;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.store.dispatch(new GetUser(+params.id));
    });
    this.store.select(getUser).subscribe(users => {
      if (users != null) {
        this.users = users;    
        console.log(this.users);     
        }
      });
  }
   /**
   * update a  user
   */
  onSaveUser() { 
    this.store.dispatch(new UpdateUser(this.users));
    console.log(this.users);
   }

  reset() {
    this.users.firstname = '';
    this.users.lastname = '';
    this.users.username = '';
    this.users.password='';
  }
  onBack() {
    this.router.navigate(['/users']);
  }
  /**
   * Delete the selected User
   */
  delete(id: number) {
    if (confirm('Are you sure do you want to delete this User?')) {
      this.store.dispatch(new UserActions.RemoveUser(id));
    }
  }
}
