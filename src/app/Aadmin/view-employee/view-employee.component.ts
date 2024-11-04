import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  employee!: Employee;
  errorMessage: string = '';


  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (employeeId) {
      this.getEmployeeDetails(employeeId);
    }
  }

  getEmployeeDetails(id :number): void {
    //const employeeId = Number(sessionStorage.getItem('employeeId'));
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe(
        (data: Employee) => {
          this.employee = data;
        },
        (error) => {
          console.error('Error fetching employee details:', error);
        }
      );
    }


  }}
