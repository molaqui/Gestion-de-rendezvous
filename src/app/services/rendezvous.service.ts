import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RendezVous, Status} from "../models/RendezVous";


@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) { }

  getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/admins/rendezvous`);
  }

  getRendezVousByAdminIdAndStatus(adminId: number, status: Status): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/admins/${adminId}/rendezvous/status/${status}`);
  }


  approveRendezVous(id: number): Observable<RendezVous> {
    return this.http.post<RendezVous>(`${this.apiUrl}/rendezvous/approve/${id}`, {});
  }

  rejectRendezVous(id: number): Observable<RendezVous> {
    return this.http.post<RendezVous>(`${this.apiUrl}/rendezvous/reject/${id}`, {});
  }

  // Méthode pour récupérer les rendez-vous par identifiant d'employé
  getRendezVousByEmployeeId(employeeId: number): Observable<RendezVous[]> {
    const url = `${this.apiUrl}/employees/${employeeId}/rendezvous`;
    return this.http.get<RendezVous[]>(url);
  }

  countRendezVousByEmployeeIdAndStatus(adminId: number, employeeId: number, status: string): Observable<number> {
    const url = `${this.apiUrl}/admins/${adminId}/employees/${employeeId}/rendezvous/count/status/${status}`;
    return this.http.get<number>(url);
  }
  addRendezVous(rendezVous: RendezVous): Observable<RendezVous> {
    const url = `${this.apiUrl}/rendezvous`;
    return this.http.post<RendezVous>(url, rendezVous);
  }
  deleteRendezVous(id: number): Observable<void> {
    const url = `${this.apiUrl}/rendezvous/${id}`;
    return this.http.delete<void>(url);
  }
  updateRendezVous(id: number, rendezVous: RendezVous): Observable<RendezVous> {
    const url = `${this.apiUrl}/rendezvous/${id}`;
    return this.http.put<RendezVous>(url, rendezVous);
  }

  getRendezVousById(id: number): Observable<RendezVous> {
    const url = `${this.apiUrl}/rendezvous/${id}`;
    return this.http.get<RendezVous>(url);
  }

  getRendezVousByEmployeeIdAndStatus(employeeId: number, status: string): Observable<RendezVous[]> {
    const url = `${this.apiUrl}/rendezvous/employee/${employeeId}/status/${status}`;
    return this.http.get<RendezVous[]>(url);
  }
}
