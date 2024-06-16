import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AuthService } from './auth/auth.service'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CameraService } from './services/camera.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [AuthService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   ],
  bootstrap: [AppComponent],
})
export class AppModule {}
