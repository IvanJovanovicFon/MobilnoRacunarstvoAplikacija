import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanLoad {
  constructor(private authService:AuthService, private router: Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isUserAuthenticated.pipe(
      take(1),
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl("/log-in");
        }
      })
    );
  }
  

}

