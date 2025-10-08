import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { PessoasService } from '../core/services/pessoas.service';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { HomePublicaComponent } from "./home-publica/home-publica.component";
import { AgendaEvent, AgendaService } from '../core/services/agenda.service';

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
      map((events: AgendaEvent[]) =>
        events
          .map((e: AgendaEvent) => {
            // start pode ser Date | string | undefined. Alguns cenários expõem startStr.
            const raw = e['start'] ?? (e as any).startStr as string | Date | undefined;

            const date =
              raw instanceof Date ? raw :
              raw ? new Date(raw) : undefined;

            if (!date || Number.isNaN(date.getTime())) return null;

            const assunto = e.extendedProps?.assunto ?? '';
            return { title: e['title'] ?? '', date, assunto };
          })
          // type guard: remove null e informa o TS do shape final
          .filter(
            (v): v is { title: string; date: Date; assunto: string } => v !== null
          )
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(0, 5)
      )
    );
  }
}