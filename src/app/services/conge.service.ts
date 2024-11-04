// src/app/services/conge.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Conge} from "../models/Conge";


@Injectable({
  providedIn: 'root'
})
export class CongeService {

  private apiUrl = 'http://localhost:8085/leaves'; // URL de votre API

  constructor(private http: HttpClient) { }

  getAllConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/all`);
  }

  getCongeByStatus(status: string): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/status/${status}`);
  }

  requestLeave(conge: Conge): Observable<Conge> {
    return this.http.post<Conge>(`${this.apiUrl}/request`, conge);
  }

  approveLeave(id: number | undefined): Observable<Conge> {
    // Ajout d'un objet vide comme corps de la requête
    return this.http.post<Conge>(`${this.apiUrl}/approve/${id}`, {});
  }

  rejectLeave(id: number): Observable<Conge> {
    // Ajout d'un objet vide comme corps de la requête
    return this.http.post<Conge>(`${this.apiUrl}/reject/${id}`, {});
  }

  countLeavesByStatus(status: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/status/${status}`);
  }

}
