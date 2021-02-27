import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutedComponents, UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ngrx elements
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { UsersEffects } from './store/users.effects';
import { EffectsModule } from '@ngrx/effects';
import * as UserReducer from './store/users.reducer';
import { UsersService } from './Shared/users.service';


export const reducers: ActionReducerMap<any> = {
  users: UserReducer.reducer
};

@NgModule({
  declarations: [UsersRoutedComponents],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UsersEffects])
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
