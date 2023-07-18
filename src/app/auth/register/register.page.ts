import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService:AuthService, private router:Router, private load:LoadingController) {
  }
   registerForm: FormGroup =  new FormGroup({})

  ngOnInit() {
    this.registerForm=new FormGroup({
      name:new FormControl(null, Validators.required),
      lastname:new FormControl(null, Validators.required),
      email:new FormControl(null,[Validators.required, Validators.email]),
      password:new FormControl(null, [Validators.required, Validators.minLength(7)])
    });    
  }
  onRegister(){
    this.load
    .create({message: 'registering...'})
    .then((loadingEl)=>{
      loadingEl.present();
      console.log(this.registerForm)
      this.authService.register(this.registerForm.value).subscribe(resData=>{
        console.log("Uspesno")
        console.log(resData);
        this.router.navigateByUrl("/movie-notes/tabs/explore")
        loadingEl.dismiss();
      })
    })
  }

}
