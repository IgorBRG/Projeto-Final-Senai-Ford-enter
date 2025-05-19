import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(
    private router: Router, 
    public authService: AuthService
  ) {}

  efetuarLogout(): void {
    console.log('SidebarComponent: Método efetuarLogout() FOI CHAMADO.'); 
    this.authService.logout();
  }
}
