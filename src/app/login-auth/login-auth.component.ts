import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css'],
  providers: [AuthService]
})
export class LoginAuthComponent implements OnInit {

  constructor(public authService : AuthService ) { }

  ngOnInit() {
  }

}
