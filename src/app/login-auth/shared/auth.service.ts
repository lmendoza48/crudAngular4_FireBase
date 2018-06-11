import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import { UserInfo } from '../shared/user-model'
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth_state : any = null;
  userList : AngularFireList<any>;
  userSelected : UserInfo = new UserInfo();

  constructor(private firebase : AngularFireAuth, private route : Router, private db : AngularFireDatabase) {
    this.firebase.authState.subscribe((auth) =>{
      this.auth_state = auth
    });
   }

   get isUserAnonymousLoggedIn() : boolean {
     return (this.auth_state != null) ? this.auth_state.isAnonymous : false 
   }

   get currentUserId() : string {
     return (this.auth_state !== null) ? this.auth_state.uid : ''
   }

   get currentUserName() : string {
     return this.auth_state['email']
   }

   get currentUser() : any {
     return (this.auth_state !== null) ? this.auth_state : null;
   }

   get isUserEmailLoggedIn(): boolean {
    if ((this.auth_state !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  //** Crear Usuario */
  signUpWithEmail(userList : UserInfo) {
    return this.firebase.auth.createUserWithEmailAndPassword(userList.email, userList.password)
      .then((user) => {
        this.auth_state = user,
        this.saveUser(userList),
        this.loginWithEmail(userList.email , userList.password)
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }

  //** Ingresar Usuario */
  loginWithEmail(email: string, password: string) {
    return this.firebase.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.auth_state = user
      })
      .catch(error => {
        console.log(error)
        throw error
      });
  }
  
  //**Cerrar session */
  signOut() {
    this.firebase.auth.signOut();
    this.route.navigate(['/'])
  }
  
  saveUser(userS : UserInfo){
    this.db.list('users').push({
      email : userS.email,
      dni : userS.dni,
      password : userS.password,
      status : true      
    })
  }

}
