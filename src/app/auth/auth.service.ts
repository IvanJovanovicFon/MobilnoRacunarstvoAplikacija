import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { __values } from 'tslib';
import { error } from 'console';

interface AuthResponseData{
  idToken:string;
  email:string;
  name: string;
  lastname: string;
  localId:string;
  expiresIn: string;
  registered?:boolean;
}

interface UserData{
  email:string;
  password:string;
  name: string;
  lastname: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthenticated = false;
  private _user = new BehaviorSubject<User | null>(null);
  public email:string="";
  public name:string="";
  public surname:string="";


  constructor(private http: HttpClient) { }

  get isUserAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }
  
  get userId(){
    return this._user.asObservable()
    .pipe(
      map((user)=>{
        if(user) 
          return user.id;
        else 
          return null;
      }
    ))
  }

  get token(){
    return this._user.asObservable()
    .pipe(
      map((user)=>{  
        if(user) {
          return user.token;
        }
          else return null;
      }
    ))
  }
 
  register(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>('http://localhost:3000/register', {
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.lastname,
      returnSecureToken: true
    }).pipe(
      catchError(errorResponse => {
        return throwError('An error occurred during registration.');
      })
    );
  }


  logIn(user:UserData){
    this._isUserAuthenticated=true
    return this.http.post<AuthResponseData>(`http://localhost:3000/login`,
    {email: user.email, password: user.password,name: user.name, lastname: user.lastname, returnSecureToken: true})
    .pipe(
      tap((userData: AuthResponseData)=>{
        console.log('userData: ', userData)
        const expirationTime= new Date(new Date().getTime() + +userData.expiresIn*1000);
        const user =  
        new User(userData.idToken, userData.email, userData.name, userData.lastname,userData.idToken, expirationTime)
        this._user.next(user);
        console.log('Moj korisnik:', user)
        this.email=user.email;
        this.name=user.name;
        this.surname=user.lastname;

      }),
      catchError(errorResponse => {
        let errorMessage = 'An error occurred!';
        if (errorResponse.error && errorResponse.error.error) {
          switch (errorResponse.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'Email not found.';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'Invalid password.';
              break;
          }
        }
        return throwError(errorMessage);
      }
      )
    );
  }

  logOut(){
    this._user.next(null)
  }

}
