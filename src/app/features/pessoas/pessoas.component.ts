import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

type Pessoa = { 
  id: number; 
  nome: string; 
  cpf: string; 
  email: string; 
  escola: string; 
  endereco: string;
};

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [ TableModule, CommonModule, ButtonModule, InputTextModule, FormsModule, ButtonModule, RouterLink ],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})

export class PessoasComponent {

  pessoas: Pessoa[] = [
    { id: 1, nome: 'Ana',   cpf: '111.222.333-44', email: 'ana@ex.com',   escola: 'Escola A', endereco: 'Rua das Flores, 123' },
    { id: 2, nome: 'Bruno', cpf: '555.666.777-88', email: 'bruno@ex.com', escola: 'Escola B', endereco: 'Av. Brasil, 987' },
    { id: 3, nome: 'Clara', cpf: '999.000.111-22', email: 'clara@ex.com', escola: 'Escola C', endereco: 'Rua Azul, 45' }
  ];

  public goToAdcPessoas(){
    window.location.href = '/pessoas/adicionar';
  }

}
