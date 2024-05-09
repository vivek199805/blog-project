import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private data: DataService,
    private authService:AuthService,
) {}

  ngOnInit(): void {
  }

  get token() {
    return localStorage.getItem('userData');
  }

  logout() {
    this.data.user = {};
 this.authService.logout();
  }

}
