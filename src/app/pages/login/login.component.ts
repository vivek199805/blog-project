import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxToastrService } from 'src/app/services/ngx-toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  isLogined:boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toaster:NgxToastrService
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
     if(!this.isLogined){
      this.authService.login(data).subscribe((res: any) => {
        localStorage.setItem('userData', JSON.stringify(res));
        this.router.navigate(['/']);
        this.toaster.showSuccess('Login Successfully', 'Succcess')
    },
    (error) => {
      this.toaster.showError(error, 'Error')
    });
     }else{
      this.authService.signUp(data).subscribe((res: any) => {
        if(res){
           this.isLogined = false;
           this.loginForm.reset();
           this.toaster.showSuccess('User Created Successfully', 'Succcess')
          }
      },
      (error) => {
        this.toaster.showError(error, 'Error')
        }
      );
     }

  }

  get f() {
    return this.loginForm.controls;
  }

  loginSignup(){
   this.isLogined = !this.isLogined;
   this.loginForm.reset();
  }
}
