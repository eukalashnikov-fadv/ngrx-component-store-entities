import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {UsersComponent} from "./users.component";
import {UserComponent} from "./user/user.component";
import {UsersService} from "../users.service";
import {RouterModule, Routes} from "@angular/router";
import {UsersStore} from "./users.store";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {
    title: 'users',
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgOptimizedImage
  ],
  providers: [
    UsersService,
    UsersStore
  ]
})
export class UsersModule { }
