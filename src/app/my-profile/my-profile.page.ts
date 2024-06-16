import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CameraService } from '../services/camera.service';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraResultType} from '@capacitor/camera';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  email:string="";
  name:string="";
  surname:string="";
  userImage: string | undefined = '';
  userId: string = "";
  picture : string = '';

  ngOnInit() {
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

  async takePicture(){
    const img= await Camera.getPhoto({
      quality:100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    })
    this.userImage = img.dataUrl;
  }




}
