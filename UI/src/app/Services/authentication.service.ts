import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginResponseDto } from '../Models/LoginResponseDto';
import { RegistrationResponseDto } from '../Models/RegistrationResponseDto';
import { UserForLoginDto } from '../Models/UserForLoginDto';
import { UserForRegistrationDto } from '../Models/UserForRegistrationDto';

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
}
