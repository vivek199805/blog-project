import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  blogs:any
  status:any;
  statusValue: any = 1;
  blogData: any = [];
  editID: any;
  isEdit: boolean = false;
  constructor(
    private router: Router,
    private data: DataService,
    private authService:AuthService,
    private activateroute:ActivatedRoute
  ) {

  }

  ngOnInit() {
   this.getId()
  }
   getId() {
    this.activateroute.params.subscribe((params: any) => {
        if (typeof params['id'] != 'undefined') {
            this.editID = params['id'];
            this.isEdit = true;
        }
    });
    if (this.isEdit) {
         this.getBlogData();
    }
}

getBlogData(){
  this.authService.getBlogById(this.editID, 'blogs').subscribe((res: any) => {
    if(res){
    this.blogs = res.blogs;
    this.statusValue = res.status;
    }
  });
}

  saveBlog() {
    if (!this.blogs) {
      return;
    } else {
      const data = {
        blogs: this.blogs,
        status: this.statusValue,
        user:  this.data.userData.email
      }
      if(this.isEdit){
        this.authService.update(this.editID,'blogs', data).subscribe((res: any) => {
          if(res){
            this.router.navigate(['blog/list'])
          }
        });
      }else{
        this.authService.postdata(data, 'blogs.json').subscribe((res: any) => {
          if(res){
            this.router.navigate(['blog/list'])
          }
        });
      }
    }
  }

  statusChange(status: boolean) {
    status = !status;
    if (status == true) {
        this.statusValue = 1;
    } else {
        this.statusValue = 0;
    }

}

}
