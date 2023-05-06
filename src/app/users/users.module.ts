import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UsersComponent } from './users.component';
import { UsersService } from '../users.service';
import { UsersStore } from './users.store';

const routes: Routes = [
  {
    title: 'users',
    path: '',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgOptimizedImage,
  ],
  providers: [UsersService, UsersStore],
})
export class UsersModule {}
