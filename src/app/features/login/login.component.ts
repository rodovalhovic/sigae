import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';

declare const grecaptcha: any;

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
  @ViewChild('captchaContainer', { static: true }) captchaContainer!: ElementRef<HTMLDivElement>;

  visible = false;
  email = '';
  senha = '';
  erro = '';
  sucesso = false;
  ref?: DynamicDialogRef; 
  widgetId: number | null = null;

  siteKey = '6Ldd1uArAAAAAAehBI1ymwRhnoQiN6y4WXxMKnO7';

  constructor(private dialogService: DialogService) {}

  ngAfterViewInit() {
    const waitForCaptcha = () => {
      const g = (window as any).grecaptcha;
      if (g?.render) {
        this.widgetId = grecaptcha.render(this.captchaContainer.nativeElement, {
          sitekey: this.siteKey,
          callback: (token: string) => {
            // guarda o token quando o usuário resolve o captcha
            this.sucesso = false;
            this.erro = '';
            sessionStorage.setItem('captchaToken', token);
          },
          'expired-callback': () => sessionStorage.removeItem('captchaToken'),
          'error-callback': () => sessionStorage.removeItem('captchaToken'),
        });
      } else {
        setTimeout(waitForCaptcha, 100);
      }
    };
    waitForCaptcha();
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  submit() {
    this.erro = '';
    this.sucesso = false;

    // Validação de campos
    if (!this.email || !this.senha) return;

    const token = sessionStorage.getItem('captchaToken');

    // Verificação do CAPTCHA
    if (!token) {
      this.erro = 'Por favor, confirme o CAPTCHA antes de entrar.';
      return;
    }

    // "Login fake" aprovado
    this.sucesso = true;
    console.log('E-mail:', this.email);
    console.log('Senha:', this.senha);
    console.log('Token reCAPTCHA:', token);

    this.loggedIn.emit(); // notifica o menu/auth
    this.close(); // fecha o modal

    // Limpeza do CAPTCHA
    if (this.widgetId !== null) grecaptcha.reset(this.widgetId);
    sessionStorage.removeItem('captchaToken');
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
