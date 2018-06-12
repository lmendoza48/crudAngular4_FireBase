import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './shared/employee.service';
import { AuthService } from 'src/app/login-auth/shared/auth.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  isAuth = false;

  constructor( public auth : AuthService ,public employeeService : EmployeeService) { }

  ngOnInit() {
    this.isAuth = this.auth.isUserEmailLoggedIn;
  }

  getBack(){
    this.auth.signOut();
  }

}
