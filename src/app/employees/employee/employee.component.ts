import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import{ EmployeeService } from '../shared/employee.service';
import { AuthService } from 'src/app/login-auth/shared/auth.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  isAuth = false;

  constructor(public auth : AuthService, public employeeService : EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.isAuth =this.auth.isUserEmailLoggedIn;
  }

  /** metodo para traer los datos del formmulario
   * metodo se llama igual al nombre en el form create
   */
  onSubmit(form : NgForm)
  {
    if(form.value.$key == null )
      this.employeeService.insertEmployee(form.value);
      else
      this.employeeService.updateEmployee(form.value);  
    this.resetForm(form)
  }

  resetForm(form? : NgForm)
  {
    if(form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      $key : null,
      name : '',
      description : '',
      comment : '',
    }
  }

  onLogout(){
    this.auth.signOut();
  }
}
