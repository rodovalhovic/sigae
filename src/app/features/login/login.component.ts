import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, DialogModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [DialogService] 
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<void>();

  visible = false;
  email = '';
  senha = '';
  ref?: DynamicDialogRef; 

  constructor(private dialogService: DialogService) {}

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  submit() {
    if (!this.email || !this.senha) return;

    this.loggedIn.emit(); // notifica o menu/auth
    this.close();

    // limpa os campos após o login
    this.email = '';
    this.senha = '';
  }

  abrirEsqueciSenha() {
    this.ref = this.dialogService.open(EsqueciSenhaComponent, {
      header: 'Recuperar senha',
      width: '25rem',
      modal: true,
      data: {
        email: this.email // passa o e-mail atual, se já digitado
      }
    });

    // quando o modal de esqueci for fechado
    this.ref.onClose.subscribe((resultado) => {
      if (resultado?.email) {
        this.email = resultado.email; // reatribui o email retornado
      }

      // reabre o login automaticamente ao fechar o "esqueci"
      this.open();
    });
  }
}
