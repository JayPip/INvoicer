import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegistrationDto } from 'src/app/Models/UserForRegistrationDto';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nickname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
  }  
  
  // public validateControl = (controlName: string) => {
  //   return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched
  // }
  // public hasError = (controlName: string, errorName: string) => {
  //   return this.registerForm.get(controlName).hasError(errorName)
  // }

  public registerUser= ( registerFormValue:any)=>{
    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      nickname: formValues.nickname,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };

    this.authService.registerUser(user)
    .subscribe({
      next: (_) =>this.router.navigateByUrl('/') ,
      error: (err: HttpErrorResponse) => console.log(err.error)
    })
  }

}
