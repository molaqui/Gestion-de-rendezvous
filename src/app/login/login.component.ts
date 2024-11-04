import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../models/employee";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router, private fb: FormBuilder,private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  handleLogin(): void {
    if (this.formLogin.valid) {
      const { username, password } = this.formLogin.value;
      if (username === 'admin' && password === 'admin') {
        // Stocker le nom d'utilisateur et le mot de passe dans la session
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
        // Rediriger vers le tableau de bord
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        // Vérifier si l'employé existe
        this.employeeService.login(username, password).subscribe(
          (employee: Employee) => {
            // Stocker l'identifiant, le nom et le mot de passe dans la session
            sessionStorage.setItem('employeeId', employee.id.toString());
            sessionStorage.setItem('username', employee.nom);
            sessionStorage.setItem('password', password);
            // Rediriger vers la page de l'employé (ou une autre page appropriée)
            this.router.navigateByUrl('/employee/dashboard');
          },
          (error) => {
            // Ajouter une gestion d'erreur pour les identifiants incorrects
            this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
          }
        );
      }
    }
  }

}
