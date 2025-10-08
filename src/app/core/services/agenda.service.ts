import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { EventInput } from '@fullcalendar/core';

/** Estrutura usada nos eventos */
export type Extra = { assunto: string; participantes: string[]; descricao: string };

/** tipo local (mais forte que o EventInput) */
export type AgendaEvent = Omit<EventInput, 'id' | 'extendedProps'> & {
  id: string;
  extendedProps?: Extra;
};

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private readonly API = 'http://localhost:3000/eventos';

  private _events$ = new BehaviorSubject<AgendaEvent[]>([]);
  /** stream reativa de eventos para quem quiser consumir */
  events$ = this._events$.asObservable();

  /** contagem reativa para usar na Home */
  count$ = this.events$.pipe(map(arr => arr.length));

  constructor(private http: HttpClient) {}

  /** Carrega todos os eventos da API e publica internamente */
  load() {
    this.http.get<AgendaEvent[]>(this.API).pipe(
      tap(events => this._events$.next(this.migrate(events)))
    ).subscribe();
  }

  /** Publica lista completa (caso venha de outro lugar, ex: AgendaComponent) */
  setAll(events: EventInput[]) {
    const normalized = this.migrate(events);
    this._events$.next(normalized);

    // envia pro backend de uma vez (sincronização total)
    this.http.put(this.API, normalized).subscribe();
  }

  /** Cria um novo evento */
  add(ev: EventInput) {
    const withId = this.ensureId(ev);
    return this.http.post<AgendaEvent>(this.API, withId).pipe(
      tap(newEv => {
        const arr = [...this._events$.value, newEv];
        this._events$.next(arr);
      })
    );
  }

  /** Atualiza parcialmente um evento */
  update(id: string, patch: Partial<AgendaEvent>) {
    return this.http.patch<AgendaEvent>(`${this.API}/${id}`, patch).pipe(
      tap(updated => {
        const arr = this._events$.value.map(e =>
          e.id === id ? { ...e, ...updated } : e
        );
        this._events$.next(arr);
      })
    );
  }

  /** Remove um evento por id */
  remove(id: string) {
    return this.http.delete(`${this.API}/${id}`).pipe(
      tap(() => {
        const arr = this._events$.value.filter(e => e.id !== id);
        this._events$.next(arr);
      })
    );
  }

  /** Garante id string e extendedProps tipado */
  private migrate(events: EventInput[] = []): AgendaEvent[] {
    return events.map((e, idx) => this.ensureId(e, idx));
  }

  private ensureId(e: EventInput, idx?: number): AgendaEvent {
    const id = String((e as any).id ?? this.generateId(idx));
    const extendedProps = (e as any).extendedProps as Extra | undefined;
    return { ...e, id, extendedProps };
  }

  private generateId(idx?: number) {
    return `${Date.now()}-${idx ?? Math.floor(Math.random() * 1e6)}`;
  }
}
