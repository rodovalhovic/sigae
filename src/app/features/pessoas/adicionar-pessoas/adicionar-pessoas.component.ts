import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { PessoasService } from '../../../core/services/pessoas.service';

@Component({
  selector: 'app-adicionar-pessoas',
  standalone: true,
  imports: [ StepperModule, ButtonModule, FormsModule, InputTextModule, FloatLabel ],
  templateUrl: './adicionar-pessoas.component.html',
  styleUrl: './adicionar-pessoas.component.scss'
})
export class AdicionarPessoasComponent {

  pessoas = {
    nome: '',
    cpf: '',
    email: '',
    endereco: ''
  };

  constructor(private pessoasService: PessoasService, private router: Router){}

  submit() {
    this.pessoasService.criar(this.pessoas).subscribe(() => {
       this.router.navigate(['/pessoas']);
    });
  }

  goBack(){
    this.router.navigate(['/pessoas']);
  }

}
