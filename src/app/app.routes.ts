import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home-publica/home-publica.component')
        .then(m => m.HomePublicaComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/features.component')
        .then(m => m.FeaturesComponent)
  },
  {
    path: 'pessoas',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/pessoas/pessoas.component')
            .then(m => m.PessoasComponent)
      },
      {
        path: 'adicionar',
        loadComponent: () =>
          import('./features/pessoas/adicionar-pessoas/adicionar-pessoas.component')
            .then(m => m.AdicionarPessoasComponent)
      }
    ]
  },
  {
    path: 'agenda',
    loadComponent: () =>
      import('./features/agenda/agenda.component')
        .then(m => m.AgendaComponent)
  },
  {
    path: 'planos',
    loadComponent: () =>
      import('./features/planos-melhoria/planos-melhoria.component')
        .then(m => m.PlanosMelhoriaComponent)
  },
  { path: '**', redirectTo: '' }
];
