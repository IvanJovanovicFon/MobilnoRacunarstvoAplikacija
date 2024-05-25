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
      this.loadPicture();
    });
  }


  constructor(
    private cameraService: CameraService,
    private http: HttpClient,
    private authService: AuthService
  ) {}



  takePicture() {
    this.cameraService.takePicture().then((imageData) => {
      this.userImage = imageData;
      this.savePicture(imageData);
    }).catch((error) => {
      console.error('Camera error:', error);
    });
  }

  savePicture(imageData: string) {
    this.http.post('http://localhost:3000/upload-profile-picture', {
      userId: this.userId,
      image: imageData
    }).subscribe(response => {
      console.log('Picture saved:', response);
    });
  }

  loadPicture() {
    this.http.get<{ image: string }>(`http://localhost:3000/get-profile-picture/${this.userId}`)
      .subscribe(response => {
        this.userImage = response.image || null;
      }, error => {
        console.error('Error loading picture:', error);
        this.userImage = null;
      });
  }
}
