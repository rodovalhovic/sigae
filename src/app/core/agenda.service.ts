import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { EventInput } from '@fullcalendar/core';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private _events$ = new BehaviorSubject<EventInput[]>([]);

  /** stream de eventos para quem quiser consumir */
  events$ = this._events$.asObservable();

  /** contagem reativa para usar na Home */
  count$ = this.events$.pipe(map(arr => arr.length));

  /** carga inicial (troque por HTTP se tiver API) */
  load() {
    const raw = localStorage.getItem('events') ?? '[]';
    this._events$.next(JSON.parse(raw));
  }

  /** publique a lista inteira (ex.: ao abrir a Agenda) */
  setAll(events: EventInput[]) {
    this._events$.next(events);
    localStorage.setItem('events', JSON.stringify(events));
  }

  /** utilitário opcional */
  add(ev: EventInput) {
    const arr = [...this._events$.value, ev];
    this.setAll(arr);
  }
}