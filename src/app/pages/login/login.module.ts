import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  {path: '',component:LoginComponent},
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[LoginComponent]
})
export class LoginModule { }
