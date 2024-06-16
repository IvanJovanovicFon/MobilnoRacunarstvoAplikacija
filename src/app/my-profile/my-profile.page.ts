import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CameraService } from '../services/camera.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  email:string="";
  name:string="";
  surname:string="";
  userImage: string | null = null;
  userId: string = "";

  ngOnInit() {
    console.log("Otvoren")
    this.email=this.authService.email;
    this.name=this.authService.name;
    this.surname=this.authService.surname;
    this.authService.userId.subscribe((id) => {
      if(id) 
        this.userId = id;

    });
  }


  constructor(
    private cameraService: CameraService,
    private http: HttpClient,
    private authService: AuthService
  ) {}





}
