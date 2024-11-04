import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-emp-password',
  templateUrl: './change-emp-password.component.html',
  styleUrls: ['./change-emp-password.component.css']
})
export class ChangeEmpPasswordComponent implements OnInit {
  form!: FormGroup;
  employee!: Employee;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService,private route :Router) { }
  ngOnInit(): void {
    const employeeId = Number(sessionStorage.getItem('employeeId'));
    this.getEmployeeDetails(employeeId);
    this.form = this.fb.group({
      nom: [{ value: '', disabled: true }],
      prenom: [{ value: '', disabled: true }],
      adresse: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      immatricule: [{ value: '', disabled: true }],
      role: [{ value: 'Agent', disabled: true }],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  getEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(
      (employee) => {
        this.employee = employee;
        this.form.patchValue({
          nom: employee.nom,
          prenom: employee.prenom,
          adresse: employee.adress,
          email: employee.email,
          immatricule: employee.matricule
        });
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.form.valid) {
      let newPassword = this.form.value.newPassword;
      let confirmPassword = this.form.value.confirmPassword;
      if (newPassword === confirmPassword) {
        this.employeeService.updatePassword(this.employee.id, newPassword).subscribe(
          (employee) => {
            alert('Password updated successfully');
            this.route.navigateByUrl('employee/dashboard');
            // Ajoutez une logique supplémentaire si nécessaire,
            newPassword="";
            confirmPassword="";

          },
          (error) => {
            console.error('Error updating password:', error);
          }
        );
      } else {
        console.log('Passwords do not match.');
      }
    }
  }

}
