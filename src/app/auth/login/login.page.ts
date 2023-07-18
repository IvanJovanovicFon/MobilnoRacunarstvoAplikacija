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
isLoading =false;
  constructor(private authService:AuthService, private router:Router) {}

  ngOnInit() {
    this.loginForm=new FormGroup({
      email:new FormControl(null, [Validators.required, Validators.email]),
      password:new FormControl(null,[Validators.required, Validators.minLength(7)])
    });
  }
    onLogin(){
      this.isLoading = true;

      this.authService.logIn(this.loginForm.value).subscribe(resData=>{
        console.log("Uspesno")
        console.log(resData)
        this.router.navigateByUrl("/movie-notes/tabs/explore")
      });
    }

    onRegister(){
      this.router.navigateByUrl("/register")
    }

}
