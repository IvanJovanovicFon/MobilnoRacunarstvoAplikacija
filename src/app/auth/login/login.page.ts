import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }
onLogin(){
  this.authService.logIn();
  this.router.navigateByUrl("/movie-notes/tabs/explore")
}

}