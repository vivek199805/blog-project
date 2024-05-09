import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const route: Routes = [
  {path: '',component:ProfileComponent,canActivate: [AuthGuard],},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class ProfileModule { }
