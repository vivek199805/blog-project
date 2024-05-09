import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogData: any;

  constructor(private data: DataService,
    private authService:AuthService,
    private router:Router
  ) {}

   ngOnInit() {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.authService.getdata('blogs.json').pipe(
      map(res =>{
        let tasks=[];
        for(let key in res){
          if(res.hasOwnProperty(key)){
            tasks.push({...res[key],id:key});
          }
        }
        return tasks;
      })
    ).subscribe((res: any) => {
     console.log(res);
     this.blogData = res;
    });
  }
}
