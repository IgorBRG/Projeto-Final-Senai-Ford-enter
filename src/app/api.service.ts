import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './interfaces/Login.component';
import { CredenciaisLogin } from './interfaces/credenciais-login';
import { Vehicle, SelectedVehicleData } from './interfaces/Dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api-ford-enter.onrender.com';

  constructor(private http: HttpClient) {}

  login(credenciais: CredenciaisLogin): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/login`, credenciais);
  }

  getVehicles(): Observable<{ vehicles: Vehicle[] }> {
    return this.http.get<{ vehicles: Vehicle[] }>(`${this.baseUrl}/vehicles`);
  }

  getVehicleData(vin: string): Observable<SelectedVehicleData> {
    return this.http.post<SelectedVehicleData>(`${this.baseUrl}/vehicleData`, { vin });
  }
}