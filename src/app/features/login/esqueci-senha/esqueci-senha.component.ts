import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { inject } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [FormsModule, DialogModule, InputTextModule, PasswordModule, Button],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.scss'
})
export class EsqueciSenhaComponent {

  ref = inject(DynamicDialogRef);
  config = inject(DynamicDialogConfig);

  email = this.config.data?.email ?? '';

  fechar() {
    this.ref.close();
  }

  enviarLink() {
    // aqui poderia ter lógica de envio real
    console.log('Link de recuperação enviado para:', this.email);
    this.ref.close({ email: this.email });
  }
}
