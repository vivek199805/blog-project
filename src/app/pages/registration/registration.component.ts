import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email = '';
  password = '';


  btnDisabled = false;
	registerForm:any = FormGroup;
  constructor(
    private router: Router,
    private data: DataService,
    private fb: FormBuilder,
    private authService:AuthService
  ) {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/)]],
      password: ["", [Validators.required]],
		});
  }

  ngOnInit() {}

   register() {
    if (!this.registerForm.valid) {
      return;
    } else {
      const data =           {
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        returnSecureToken:true
      }
      this.authService.signUp(data).subscribe((res: any) => {
          if(res){
            this.router.navigate(['/login']);
            }
        },
        (error) => {
          console.log(error);
          }
        );
    }
  }


  get f() {
    return this.registerForm.controls;
  }

}
