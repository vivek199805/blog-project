import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {path:'add',component:AddBlogComponent,  canActivate: [AuthGuard],},
  {path:'list',component:BlogsListComponent, canActivate: [AuthGuard],},
  {path:'add/:id',component:AddBlogComponent,   canActivate: [AuthGuard],},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
