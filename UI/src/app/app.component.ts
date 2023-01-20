import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   *
   */
  title = 'AngularUI';
  public isUserAuthenticated: boolean;
  //injection of authentication service
  constructor(private router: Router, private authService: AuthenticationService) {}
  ngOnInit() {
    //subscribe to notification sent form authentication service
    this.authService.authChanged.subscribe(res =>{
      this.isUserAuthenticated = res;
    })
  }
  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  

  GetUrl(){
    return this.router.url;
  }
}
