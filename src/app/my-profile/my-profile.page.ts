import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  email:string="";
  name:string="";
  surname:string="";

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log("Otvoren")
    this.email=this.authService.email;
    this.name=this.authService.name;
    this.surname=this.authService.surname;

  }

}
