import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Pessoa } from '../../shared/interfaces/pessoas';
import { PessoasService } from '../../core/services/pessoas.service';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [ TableModule, CommonModule, ButtonModule, InputTextModule, FormsModule, ButtonModule ],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})

export class PessoasComponent {

  pessoas: Pessoa[] = [];
  clonedPessoas: { [s: string]: Pessoa } = {};

  constructor(private pessoasService: PessoasService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pessoasService.listar().subscribe(dados => this.pessoas = dados);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pessoasService.buscarPorId(+id).subscribe((pessoa) => { 
        this.pessoas = [pessoa];
      });
    }
  }

  excluir(pessoaId: number): void {
    this.pessoasService.deletar(pessoaId).subscribe(() => {
      this.pessoas = this.pessoas.filter(pessoa => pessoa.id !== pessoaId);
    });
  }

  public goToAdcPessoas(){
    this.router.navigate(['/pessoas/adicionar']);
  }

  editar(pessoa: Pessoa) {
    this.clonedPessoas[String(pessoa.id)] = { ...pessoa }; // clona os dados originais
  }

  salvar(pessoa: Pessoa, index: number) {
    this.pessoasService.atualizar(pessoa).subscribe({
      next: (atualizada) => {
        // atualiza a linha localmente
        this.pessoas[index] = atualizada;
        delete this.clonedPessoas[String(pessoa.id)];
      },
      error: () => {
        // se der erro, restaura o clone
        this.cancelar(pessoa, index);
      }
    });
  }

  // Chamado quando o usuário clica no X (cancelar)
  cancelar(pessoa: Pessoa, index: number) {
    this.pessoas[index] = this.clonedPessoas[String(pessoa.id)]; // restaura os dados originais
    delete this.clonedPessoas[String(pessoa.id)];
  }

}
