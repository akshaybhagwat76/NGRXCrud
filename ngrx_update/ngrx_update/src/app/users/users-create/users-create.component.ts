import { Component, OnInit } from '@angular/core';
import {User} from '../Shared/user';
import {Store} from '@ngrx/store';
import {AppState} from '../../app-state';
import {Router} from '@angular/router';
import { AddUser } from '../store/users.actions';


@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {
  title='Create New User';
  users: User = new User();
  constructor(private router: Router,private store: Store<AppState>) { }

  ngOnInit() {    
  
  }

   /**
   * Create a new user
   */
  onSaveUser() { 
   this.store.dispatch(new AddUser(this.users));
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
}
