import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.loginForm=new FormGroup({
      email:new FormControl(null, [Validators.required, Validators.email]),
      password:new FormControl(null,[Validators.required, Validators.minLength(7)])
    });
  }
    onLogin(){
      this.authService.logIn();
      this.router.navigateByUrl("/movie-notes/tabs/explore")
    }
    onRegister(){
      this.router.navigateByUrl("/register")
    }

}
