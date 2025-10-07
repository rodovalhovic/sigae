import { Component, ViewChild } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from '../../features/login/login.component';
import { AuthService } from '../../core/services/auth-service.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, LoginComponent, AsyncPipe, NgClass, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: { ngSkipHydration: '' }
})

export class MenuComponent {
  constructor(public auth: AuthService) {}

  items$!: Observable<any[]>; // “definido depois”
  
  allItems = [
    { label: 'Pessoas', icon: 'pi pi-user', routerLink: ['/pessoas'],  routerLinkActiveOptions: { exact: true } },
    { label: 'Agenda',  icon: 'pi pi-calendar', routerLink: ['/agenda'],   routerLinkActiveOptions: { exact: true } },
    { label: 'Planos',  icon: 'pi pi-copy', routerLink: ['/planos'],   routerLinkActiveOptions: { exact: true } }
  ];

  @ViewChild(LoginComponent) loginDialog!: LoginComponent;

  ngOnInit() {
    this.items$ = this.auth.isLoggedIn$.pipe(
      map(logged => logged ? this.allItems : [])
    );
  }

  onAuthButtonClick() {
    this.auth.isLoggedIn$.pipe(take(1)).subscribe(logged => {
      if (logged) this.auth.logout();
      else this.loginDialog.open(); // abre modal
    });
  }

  onLoggedIn() {
    this.auth.login(); // toggle para logado via RxJS
  }
}
