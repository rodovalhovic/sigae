export interface Evento {
  assunto?: string;
  participantes?: string[];
  descricao?: string;
}

export interface CalendarEventDTO {
  id?: string | number;
  title: string;
  start: string; 
  end?: string;  
  allDay?: boolean;
  extendedProps?: Evento;
}