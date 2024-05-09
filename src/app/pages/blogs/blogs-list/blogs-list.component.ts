import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit {
  query: any;
  page = 1;
  pageSize = 4 ;
  blogsList:any = [];
  constructor(
    private authService:AuthService,
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    this.getBlogsList();
  }

   getBlogsList() {
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
      res.map((item:any) =>{
        item.status =  item.status == 1? 'Active':'In-Active'
      })
      this.blogsList = res.filter((data:any) => data.user === this.dataService.userData.email);
    });
  }

  getPremiumData(){
    this.blogsList =  this.blogsList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

   }

}
