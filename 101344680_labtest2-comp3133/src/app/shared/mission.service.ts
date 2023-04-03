import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from './mission.interface';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) { }

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  getMission(flightNumber: string): Observable<Mission> {
    const url = `${this.apiUrl}/${flightNumber}`;
    return this.http.get<Mission>(url);
  }

  getMissionsByYear(year: string): Observable<Mission[]> {
    const url = `${this.apiUrl}?launch_year=${year}`;
    return this.http.get<Mission[]>(url);
  }
}
