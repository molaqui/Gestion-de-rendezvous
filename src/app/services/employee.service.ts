import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Employee} from "../models/employee";
import {EmployeeSalaryDTO} from "../DTO/EmployeeSalaryDTO";
import {RendezVous} from "../models/RendezVous";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8085/employees'; // Remplacez par l'URL de votre API Spring

  constructor(private http: HttpClient) { }


  addemployee(salaireParJour:number,adminId: number, nom: string, prenom: string, email: string, image: string | null, motDePass: string, adresse: string, matricule: number): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('salaireParJour', salaireParJour.toString());
    formData.append('admin_id', adminId.toString());
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('email', email);
    if (image) {
      formData.append('image', image);
    }
    formData.append('motDePass', motDePass);
    formData.append('adresse', adresse);
    formData.append('matricule', matricule.toString());
    return this.http.post(`${this.apiUrl}`, formData);
  }

  getEmployeeImageById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/image`, { responseType: 'json' });
  }


  getAllEmployeesWithSalary(): Observable<EmployeeSalaryDTO[]> {
    return this.http.get<EmployeeSalaryDTO[]>(`${this.apiUrl}/salaries`);
  }


  confirmPayment(employeeId: number): Observable<EmployeeSalaryDTO> {
    return this.http.put<EmployeeSalaryDTO>(`${this.apiUrl}/${employeeId}/confirmPayment`, {});
  }

  getEmployeeStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics`);
  }


  // Méthode pour l'authentification de l'employé
  login(nom: string, motDePass: string): Observable<Employee> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('nom', nom);
    body.set('motDePass', motDePass);

    return this.http.post<Employee>(url, body.toString(), { headers });
  }

  updatePassword(employeeId: number, newPassword: string): Observable<Employee> {
    const url = `${this.apiUrl}/${employeeId}/update-password`;
    return this.http.put<Employee>(url, null, { params: { newPassword } });
  }
  getEmployeeById(id: number): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Employee>(url);
  }
}
