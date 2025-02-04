import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginResponseDto } from '../Models/LoginResponseDto';
import { RegistrationResponseDto } from '../Models/RegistrationResponseDto';
import { UserForLoginDto } from '../Models/UserForLoginDto';
import { UserForRegistrationDto } from '../Models/UserForRegistrationDto';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();
  
  constructor(private http: HttpClient) { }
  public registerUser( body: UserForRegistrationDto){
    return this.http.post<RegistrationResponseDto> ("https://localhost:7118/api/accounts/Registration", body);
  }
  public loginUser = ( body: UserForLoginDto) => {
    return this.http.post<LoginResponseDto>("https://localhost:7118/api/accounts/Login", body);
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }
  public logout(){
    //remove user login token from local storage and notifcy subscribed components
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public isUserAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return false; // No token means user is not authenticated
    if(this.isTokenExpired(token)){
      localStorage.removeItem("token")
    }
    return !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp) return true;
      const expiryDate = new Date(decoded.exp * 1000);
      return expiryDate < new Date(); 
    } catch (error) {
      return true; 
    }
  }
}
