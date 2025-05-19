import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nomeUsuario: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const usuarioAtual = this.authService.currentUserValue;
    if (usuarioAtual) {
      this.nomeUsuario = usuarioAtual.usuario;
    }
  }
}