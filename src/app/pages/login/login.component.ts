import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

 login() {
    let data = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
      returnSecureToken:true
    };

    this.authService.login(data).subscribe(
      (res: any) => {
          localStorage.setItem('userData', JSON.stringify(res));
          this.router.navigate(['/home']);
      },
      (err) => {
        alert('We got an error in Login...');
      }
    );
  }

  get f() {
    return this.loginForm.controls;
  }
}
