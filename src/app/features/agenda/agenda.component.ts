import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogModule } from 'primeng/dialog';
import { AgendaService } from '../../core/agenda.service';

type Extra = { assunto: string; participantes: string[]; descricao: string };

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule, DialogModule],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent {
  visible = false;
  selected: (Extra & { title: string }) | null = null;

  private eventos: EventInput[] = [
    {
      title: 'Reunião de Alinhamento',
      start: '2025-10-10T10:00:00',
      end: '2025-10-10T11:00:00',
      extendedProps: {
        assunto: 'Reunião',
        participantes: ['Victoria', 'Thiago'],
        descricao: 'Pauta: próximos passos do plano de melhoria.'
      } as Extra
    },
    {
      title: 'Apresentação de Resultados',
      start: '2025-10-12T15:00:00',
      extendedProps: {
        assunto: 'Apresentação',
        participantes: ['Equipe TI', 'Gestores'],
        descricao: 'Apresentar métricas do SIGAE.'
      } as Extra
    },
    {
      title: 'Treinamento Interno – Novas Funcionalidades',
      start: '2025-10-15T09:00:00',
      end: '2025-10-15T11:30:00',
      extendedProps: {
        assunto: 'Capacitação',
        participantes: ['Time de Desenvolvimento', 'Suporte Técnico'],
        descricao: 'Treinamento sobre as novas funcionalidades implementadas no sistema.'
      } as Extra
    },
    {
      title: 'Revisão de Indicadores Mensais',
      start: '2025-10-20T14:00:00',
      end: '2025-10-20T15:00:00',
      extendedProps: {
        assunto: 'Análise de Desempenho',
        participantes: ['Gestores', 'Equipe de Qualidade'],
        descricao: 'Avaliação dos indicadores do mês e definição de metas de melhoria.'
      } as Extra
    },
    {
      title: 'Planejamento de Sprint 12',
      start: '2025-10-25T09:30:00',
      end: '2025-10-25T11:00:00',
      extendedProps: {
        assunto: 'Scrum / Planejamento',
        participantes: ['Equipe de Desenvolvimento', 'Product Owner'],
        descricao: 'Planejar as atividades e prioridades para a próxima sprint.'
      } as Extra
    }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: this.eventos,
    eventClick: (info) => {
      const extra = info.event.extendedProps as Extra;
      this.selected = { title: info.event.title, ...extra };
      this.visible = true;
    }
  };

  constructor(private agendaService: AgendaService) {
    // publica os eventos para que a Home possa contar
    this.agendaService.setAll(this.eventos);
  }

  closeDialog() {
    this.visible = false;
    this.selected = null;
  }
}
