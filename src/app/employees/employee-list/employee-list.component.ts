import { Component, OnInit } from '@angular/core';
import {AngularFireList} from 'angularfire2/database'

import{ EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { element } from 'protractor';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList : Employee[];
  
  constructor(public employeeService : EmployeeService) { }

  ngOnInit() {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element =>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      })
    });
  }

  onItemClick(emp : Employee){
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(emp : Employee){
    if(confirm('Are you sure of delete this element!!!') == true){
      this.employeeService.deleteEmployee(emp);
    }
  }

}
