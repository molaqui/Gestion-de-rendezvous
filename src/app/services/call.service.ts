import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  private apiUrl = 'http://localhost:8085/api/call/makeCall';

  constructor(private http: HttpClient) {}

  makeCall(): Observable<string> {
    return this.http.get<string>(this.apiUrl);
  }
}
