import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-adicionar-pessoas',
  standalone: true,
  imports: [ StepperModule, ButtonModule, FormsModule, InputTextModule, FloatLabel ],
  templateUrl: './adicionar-pessoas.component.html',
  styleUrl: './adicionar-pessoas.component.scss'
})
export class AdicionarPessoasComponent {

  nome: string | undefined;
  cpf: string | undefined;
  email: string | undefined;
  endereco: string | undefined;

  private router = inject(Router);


  submit() {
    if (!this.nome || !this.cpf || !this.email || !this.endereco) return;
    this.nome = '';
    this.cpf = '';
    this.email = '';
    this.endereco = '';

    this.router.navigate(['/pessoas']);
  }

  goBack(){
    this.router.navigate(['/pessoas']);
  }

}
