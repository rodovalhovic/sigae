import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { PessoasService } from '../core/services/pessoas.service';
import { AgendaService } from '../core/agenda.service';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { HomePublicaComponent } from "./home-publica/home-publica.component";

type EventoExtra = { assunto?: string };

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, DividerModule, CardModule, HomePublicaComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  totals$!: Observable<{ pessoas: number; eventos: number }>;

  // mini compilado: título, data, assunto (ordenado por data, limit 5)
  eventsPreview$!: Observable<Array<{ title: string; date: Date; assunto: string }>>;

  constructor(
    private pessoasService: PessoasService,
    private agendaService: AgendaService
  ) {}

  ngOnInit(): void {
    // garantir dados
    this.pessoasService.listar().subscribe();
    this.agendaService.load();

    // totais
    this.totals$ = combineLatest([
      this.pessoasService.count$,
      this.agendaService.count$
    ]).pipe(map(([pessoas, eventos]) => ({ pessoas, eventos })));

    // preview de eventos
    this.eventsPreview$ = this.agendaService.events$.pipe(
      map(events =>
        events
          .map(e => {
            // start pode ser string | Date | undefined
            const raw = (e.start as Date) ?? (e as any).startStr ?? e['date'];
            const date = raw instanceof Date ? raw : new Date(raw);
            const assunto = ((e.extendedProps as EventoExtra) || {}).assunto ?? '';
            return { title: e.title ?? '', date, assunto };
          })
          .filter(e => !Number.isNaN(e.date.getTime()))
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(0, 5) // limite: 5 próximos
      )
    );
  }
}