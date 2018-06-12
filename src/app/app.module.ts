import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule } from '@angular/forms'
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthComponent } from './login-auth/login-auth.component';

import { AuthService } from './login-auth/shared/auth.service';
import { LoginComponent } from './login-auth/login/login.component';
import { RegisterComponent } from './login-auth/register/register.component';

const appRoutes: Routes = [
  {
  path: '' , 
  component:LoginAuthComponent 
  },
  { 
  path: 'login', 
  component: EmployeesComponent 
  }
  
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    LoginAuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes //route where my app
    )
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
