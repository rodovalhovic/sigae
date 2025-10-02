import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, DialogModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() loggedIn = new EventEmitter<void>();

  visible = false;
  email = '';
  senha = '';

  open()  { this.visible = true; }
  close() { this.visible = false; }

  submit() {
    if (!this.email || !this.senha) return;
    this.loggedIn.emit();
    this.close();
    this.email = '';
    this.senha = '';
  }
}
