import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Corse } from './components/corse/corse';
import { CorseAggiungi } from './components/corse-aggiungi/corse-aggiungi';
import { Prenotazioni } from './components/prenotazioni/prenotazioni';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: Login},
    { path: 'dashboard', component: Dashboard },
    { path: 'corse', component: Corse },
    { path: 'corse/aggiungi', component: CorseAggiungi },
    { path: 'prenotazioni', component: Prenotazioni }
];
