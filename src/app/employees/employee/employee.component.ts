import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import{ EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService : EmployeeService) { }

  ngOnInit() {
    this.resetForm();
  }

  /** metodo para traer los datos del formmulario
   * metodo se llama igual al nombre en el form create
   */
  onSubmit(form : NgForm)
  {
    if(form.value.$key == null )
    {
      this.employeeService.insertEmployee(form.value);
      //alert("Save complet without error!!!!");
    }else
    {
      this.employeeService.updateEmployee(form.value);
      //alert("Update element without error!!!!!");
    }  
    this.resetForm(form)
  }

  resetForm(form? : NgForm)
  {
    if(form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      $key : null,
      name : '',
      position : '',
      office : '',
      salary : 0,
    }
  }

  onDelete(emp : NgForm){
    if(confirm('Are you sure of delete this element!!!') == true){
      this.employeeService.deleteEmployee(emp.value);
      this.resetForm(emp);
    }
  }

}
