import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ContactFormData } from '../interfaces/contato';
import { NgxMaskDirective } from 'ngx-mask';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, NgxMaskDirective, CustomModalComponent],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  testMaskValue: string = '';
  contactData: ContactFormData = {
    nome: '',
    sobrenome: '',
    email: '',
    cpf: '',
    telefone: '',
    tipoContato: 'COMO DESEJA SER CONTATADO',
    aceiteTermos: false,
    receberNovidades: false
  };

  isFormSubmitted: boolean = false;
  showCustomModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor() { }

  ngOnInit(): void { }

  onSubmit(form: NgForm): void {
    this.isFormSubmitted = true;

    if (form.invalid || !this.contactData.aceiteTermos) {
      this.modalTitle = 'Atenção';
      this.modalMessage = 'Por favor, preencha todos os campos obrigatórios e aceite os termos.';
      this.showCustomModal = true;
      return;
    }

    let cpfLimpo = this.contactData.cpf.replace(/\D/g, '');
    let telefoneLimpo = this.contactData.telefone.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
      this.modalTitle = 'CPF Inválido';
      this.modalMessage = 'Por favor, insira um CPF válido com 11 dígitos.';
      this.showCustomModal = true;
      return;
    }

    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      this.modalTitle = 'Telefone Inválido';
      this.modalMessage = 'Por favor, insira um telefone válido com DDD (10 ou 11 dígitos).';
      this.showCustomModal = true;
      return;
    }

    const dataToSend = {
      ...this.contactData,
      cpf: cpfLimpo,
      telefone: telefoneLimpo
    };

    console.log("Dados do Formulário para Envio:", dataToSend);

    this.modalTitle = 'Sucesso!';
    this.modalMessage = `Obrigado sr(a) ${this.contactData.nome}, seus dados foram encaminhados com sucesso!`;
    this.showCustomModal = true;

    form.resetForm({
      nome: '',
      sobrenome: '',
      email: '',
      cpf: '',
      telefone: '',
      tipoContato: 'COMO DESEJA SER CONTATADO',
      aceiteTermos: false,
      receberNovidades: false
    });
    this.contactData = {
        nome: '',
        sobrenome: '',
        email: '',
        cpf: '',
        telefone: '',
        tipoContato: 'COMO DESEJA SER CONTATADO',
        aceiteTermos: false,
        receberNovidades: false
    };
    this.isFormSubmitted = false;
  }

  handleModalClose(): void {
    this.showCustomModal = false;
  }
}