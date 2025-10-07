import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { PessoasService } from '../core/services/pessoas.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  totals$!: Observable<{ pessoas: number }>;

  constructor(private pessoasService: PessoasService) {}

  ngOnInit(): void {
    // garante que a lista esteja carregada
    this.pessoasService.listar().subscribe();

    // só depois usa o service (evita o erro)
    this.totals$ = this.pessoasService.count$.pipe(
      map((pessoas) => ({ pessoas }))
    );
  }
}
