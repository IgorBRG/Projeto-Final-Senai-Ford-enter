import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Login } from './interfaces/Login.component';
import { CredenciaisLogin } from './interfaces/credenciais-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Login | null>(this.getUsuarioLogadoInicial());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    console.log('AuthService: Instanciado. Usuário inicial:', this.currentUserSubject.value);
  }

  private getUsuarioLogadoInicial(): Login | null {
    console.log('AuthService: getUsuarioLogadoInicial chamado.');
    if (typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('currentUser');
      console.log('AuthService: localStorage "currentUser" data:', userData);
      try {
        const user = userData ? JSON.parse(userData) : null;
        console.log('AuthService: Usuário parseado do localStorage:', user);
        return user;
      } catch (e) {
        console.error('AuthService: Erro ao parsear usuário do localStorage', e);
        localStorage.removeItem('currentUser'); 
        return null;
      }
    }
    console.warn('AuthService: localStorage não está disponível.');
    return null;
  }

  public get currentUserValue(): Login | null {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
    const authState = !!this.currentUserSubject.value;
    console.log('AuthService: isAuthenticated() verificado. Usuário atual:', this.currentUserSubject.value, 'Retornando:', authState);
    return authState;
  }

  login(credenciais: CredenciaisLogin): Observable<Login> {
    console.log('AuthService: Tentativa de login com:', credenciais);
    return this.apiService.login(credenciais).pipe(
      tap(usuario => {
        console.log('AuthService: Login bem-sucedido, usuário:', usuario);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(usuario));
        }
        this.currentUserSubject.next(usuario);
      }),
      catchError(error => {
        console.error('AuthService: Falha no login:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    console.log('AuthService: Logout chamado.');
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    console.log('AuthService: Usuário após logout:', this.currentUserSubject.value);
    this.router.navigate(['/login']);
  }
}