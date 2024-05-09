import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AddBlogComponent,
    BlogsListComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[
    AddBlogComponent,
    BlogsListComponent
  ]
})
export class BlogsModule { }
