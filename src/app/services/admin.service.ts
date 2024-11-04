import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8085'; // Assure-toi que apiUrl est défini dans environment.ts

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<any[]> {
    const url = `${this.apiUrl}/admins`;
    return this.http.get<any[]>(url);
  }

  getAdminById(id: number): Observable<any> {
    const url = `${this.apiUrl}/admins/${id}`;
    return this.http.get<any>(url);
  }

  addAdmin(admin: any): Observable<any> {
    const url = `${this.apiUrl}/admins`;
    return this.http.post<any>(url, admin);
  }

  deleteAdmin(id: number): Observable<void> {
    const url = `${this.apiUrl}/admins/${id}`;
    return this.http.delete<void>(url);
  }

  getEmployeesByAdminId(adminId: number): Observable<any[]> {
    const url = `${this.apiUrl}/admins/${adminId}/employees`;
    return this.http.get<any[]>(url);
  }

  countAllRendezVousByAdminId(adminId: number): Observable<number> {
    const url = `${this.apiUrl}/admins/${adminId}/rendezvous/count`;
    return this.http.get<number>(url);
  }

  countRendezVousByStatus(adminId: number, status: string): Observable<number> {
    const url = `${this.apiUrl}/admins/${adminId}/rendezvous/count/status/${status}`;
    return this.http.get<number>(url);
  }

  countRendezVousByEmployeeAndStatus(adminId: number, employeeId: number, status: string): Observable<number> {
    const url = `${this.apiUrl}/admins/${adminId}/employees/${employeeId}/rendezvous/count/status/${status}`;
    return this.http.get<number>(url);
  }



  deleteEmployee(adminId: number, employeeId: number): Observable<void> {
    const url = `${this.apiUrl}/admins/${adminId}/employees/${employeeId}`;
    return this.http.delete<void>(url);
  }

  modifieradmin(id: number, nom: string, prenom: string, email: string, image: string | null, motDePass: string, adresse: string, matricule: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    formData.append('email', email);
    if (image) {
      formData.append('image', image);
    }
    formData.append('motDePass', motDePass);
    formData.append('adresse', adresse);
    formData.append('matricule', matricule.toString());
    return this.http.put(`${this.apiUrl}/admins/modifier/${id}`, formData);
  }

  // Ajout de la méthode pour récupérer l'image d'un employé par son ID
  getEmployeeImageById(employeeId: number): Observable<{ image: string }> {
    const url = `${this.apiUrl}/admins/employees/${employeeId}/image`;
    return this.http.get<{ image: string }>(url);
  }

}
