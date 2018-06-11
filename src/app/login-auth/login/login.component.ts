import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';
  error:{name: string, message : string} = {name : '', message : ''};

  constructor(public authService : AuthService, private router : Router) {}

  ngOnInit() {
  }

   /** Para Iniciar Session */
   onLoginEmail(){
    this.authService.loginWithEmail(this.email , this.password)
      .then(()=>{
        this.router.navigate(['/login'])
      }).catch( _error => {
        this.error = _error
        this.router.navigate(['/'])
      })
  }
}
