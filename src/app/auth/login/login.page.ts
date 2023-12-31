import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  isLoading =false;
  constructor(private authService:AuthService, private router:Router, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.loginForm=new FormGroup({
      email:new FormControl(null, [Validators.required, Validators.email]),
      password:new FormControl(null,[Validators.required, Validators.minLength(7)])
    });
  }
    onLogin(){
      this.isLoading = true;

      this.authService.logIn(this.loginForm.value).subscribe(resData => {
        this.router.navigateByUrl("/movie-notes/tabs/explore");
        this.isLoading = false; 
      },
      errorMessage => {
        console.error(errorMessage);  
        this.isLoading = false; 
        let message='Incorect email or password'
        this.alertCtrl.create({
          header:"Authentication failed",
          message:errorMessage,
          buttons: ['OK']
        }).then((alert)=>{
          alert.present();
        });
        this.loginForm.reset();
      }
    );
    }

    onRegister(){
      this.router.navigateByUrl("/register")
    }

    

}
