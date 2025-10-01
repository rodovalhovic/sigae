import { Component, computed, inject } from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../core/services/auth-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule, AsyncPipe, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent {
  public auth = inject(AuthService);

  // converte Observable -> Signal (recom. para bind no template)
  isLoggedIn = toSignal(this.auth.isLoggedIn$, { initialValue: false });

  items = computed(() =>
    this.isLoggedIn()
      ? [
          { label: 'Pessoas', icon: 'pi pi-user' },
          { label: 'Agenda',  icon: 'pi pi-calendar' },
          { label: 'Plano de Ação', icon: 'pi pi-copy' }
        ]
      : []
  );

  toggleLogin() { this.isLoggedIn() ? this.auth.logout() : this.auth.login(); }
}

