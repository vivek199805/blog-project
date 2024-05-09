import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: any;

  constructor(private router: Router) {}

  get userData() {
    return JSON.parse(localStorage.getItem('userData')!);
  }

}
