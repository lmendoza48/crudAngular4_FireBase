import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database'

import { Employee } from './employee.model';


@Injectable()
export class EmployeeService {
  employeeList : AngularFireList<any>;
  selectedEmployee : Employee = new Employee();
  constructor(private firebase : AngularFireDatabase) {}

  /** metodo para obtener el nombre de tabla 
   * y listar tambien los datos */
  getData(){
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }

  insertEmployee(employee : Employee){
    this.employeeList.push({
      name : employee.name,
      position : employee.position,
      office : employee.office,
      salary : employee.salary
    })
  }

  updateEmployee(empl : Employee){
    this.employeeList.update(empl.$key,{
      name : empl.name,
      position : empl.position,
      office : empl.office,
      salary : empl.salary      
    })
  }

  deleteEmployee(empl : Employee){
    this.employeeList.remove(empl.$key)
  }
}