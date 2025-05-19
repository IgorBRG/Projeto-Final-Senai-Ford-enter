import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrincipalComponent } from './principal/principal.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { ContatoComponent } from './contato/contato.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
    },
    {
    path: 'login',
    component: LoginComponent,
    },
    {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    },
    {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    },
    {  
    path: 'principal',
    component: PrincipalComponent,
    },
    {
    path: 'lancamento',
    component: LancamentoComponent,
    },
    {   
    path: 'contato',
    component: ContatoComponent,
    },
    {
    path: '**',
    redirectTo: 'principal',
    },
];
