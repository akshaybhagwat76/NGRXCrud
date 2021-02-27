import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './users.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersCreateComponent} from './users-create/users-create.component';
import {UsersEditComponent} from './users-edit/users-edit.component';

export const UsersRoutes: Routes = [{
    path: '',
    component: UsersComponent,
    children: [
      {path: '', component: UsersListComponent},      
      {path: 'create', component: UsersCreateComponent},
      {path: 'edit/:id', component: UsersEditComponent}
    ]
  }];

  @NgModule({
    imports: [
      RouterModule.forChild(UsersRoutes)
    ],
    exports: [RouterModule]
  })
  export class UsersRoutingModule {
}

export const UsersRoutedComponents = [
    UsersComponent,
    UsersListComponent,
    UsersCreateComponent,
    UsersEditComponent
  ];