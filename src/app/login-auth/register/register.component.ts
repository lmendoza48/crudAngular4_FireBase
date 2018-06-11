import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { AuthService } from '../shared/auth.service'
import { Router } from '@angular/router';
import { UserInfo } from '../shared/user-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: {name: string, message : string} = {name : '', message : ''};
  userList : UserInfo[];

  constructor(public userServices : AuthService, private router : Router ) { }

  ngOnInit() {
  }

  onRegisterUser(form : NgForm){
    this.userServices.signUpWithEmail(form.value)
        .then(()=>{
            form.reset()
            this.router.navigate(['/login'])
        }).catch((_error)=>{
          this.errorMessage = _error
          form.reset()
          this.router.navigate(['/'])
        })
  }


}
