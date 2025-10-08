import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogModule } from 'primeng/dialog';
import { AgendaService, Extra } from '../../core/services/agenda.service';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, DialogModule],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  visible = false;
  selected: (Extra & { title: string }) | null = null;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    // começa vazio; vamos preencher com o stream do serviço
    events: [],
    eventClick: (info) => {
      const extra = info.event.extendedProps as Extra;
      this.selected = { title: info.event.title, ...extra };
      this.visible = true;
    }
  };

  constructor(private agendaService: AgendaService) {}

  ngOnInit(): void {
    // 1) Carrega da API e publica no serviço
    this.agendaService.load();

    // 2) Sempre que o serviço mudar (create/update/delete), refletimos no calendário
    this.agendaService.events$.subscribe(events => {
      // Reatribuir dispara change detection no FullCalendar
      this.calendarOptions = { ...this.calendarOptions, events };
    });
  }

  closeDialog() {
    this.visible = false;
    this.selected = null;
  }
}