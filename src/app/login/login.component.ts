import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CredenciaisLogin } from '../interfaces/credenciais-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class LoginComponent {
  loginData: CredenciaisLogin = { usuario: '', senha: '' };
  lembrarMe: boolean = false;
  mensagemDeErro: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin(loginForm: NgForm): void {
    this.mensagemDeErro = null;
    if (loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (usuarioLogado) => {
        this.router.navigateByUrl('/home');
      },
      error: (errorResponse) => {
        if (errorResponse.error && errorResponse.error.message) {
          this.mensagemDeErro = errorResponse.error.message;
        } else if (errorResponse.message) {
          this.mensagemDeErro = errorResponse.message;
        } else {
          this.mensagemDeErro = 'Erro desconhecido ao tentar fazer login. Tente novamente.';
        }
      }
    });
  }
}