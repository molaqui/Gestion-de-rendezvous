import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-employee-template',
  templateUrl: './employee-template.component.html',
  styleUrls: ['./employee-template.component.css']
})
export class EmployeeTemplateComponent implements OnInit {
  currentDate: string;
  employee!: Employee;

  constructor(private employeeService: EmployeeService,private router: Router) {
    this.currentDate = this.getFormattedDate();
  }

  ngOnInit(): void {
    const username = sessionStorage.getItem('username');
    if (username === null) {
      // Rediriger vers la page de login si les informations de session ne sont pas valides
      this.router.navigateByUrl('/login');
    }
    else
    this.getEmployeeDetails();
  }

  getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  }

  getEmployeeDetails(): void {
    const employeeId = Number(sessionStorage.getItem('employeeId'));
    if (employeeId) {
      this.employeeService.getEmployeeById(employeeId).subscribe(
        (data: Employee) => {
          this.employee = data;
        },
        (error) => {
          console.error('Error fetching employee details:', error);
        }
      );
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
    // Ajoutez votre logique de déconnexion ici, par exemple rediriger vers la page de connexion
  }
}
