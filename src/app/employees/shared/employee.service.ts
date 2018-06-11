import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database'

import { Employee } from './employee.model';
import { AuthService } from 'src/app/login-auth/shared/auth.service';


@Injectable()
export class EmployeeService {
  
  idUser:string;
  employeeList : AngularFireList<any>;
  selectedEmployee : Employee = new Employee();

  constructor(public auth : AuthService ,private firebase : AngularFireDatabase) {}

  /** metodo para obtener el nombre de tabla 
   * y listar tambien los datos */
  getData(){
    this.idUser = this.auth.currentUserId;
    this.employeeList = this.firebase.list('employees_'+this.idUser);
    return this.employeeList;
  }

  insertEmployee(employee : Employee){
    this.employeeList.push({
      name : employee.name,
      description : employee.description,
      comment : employee.comment
    })
  }

  updateEmployee(empl : Employee){
    this.employeeList.update(empl.$key,{
      name : empl.name,
      description : empl.description,
      comment : empl.comment
    })
  }

  deleteEmployee(empl : Employee){
    this.employeeList.remove(empl.$key)
  }
}