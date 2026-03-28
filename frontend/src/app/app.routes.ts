import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Corse } from './components/corse/corse';
import { CorseAggiungi } from './components/corse-aggiungi/corse-aggiungi';
import { Prenotazioni } from './components/prenotazioni/prenotazioni';
import { Register } from './components/register/register';
import { PasswordReset } from './components/password-reset/password-reset';
import { PasswordUpdate } from './components/password-update/password-update';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: Login},
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard },
    { path: 'corse', component: Corse },
    { path: 'corse/aggiungi', component: CorseAggiungi },
    { path: 'prenotazioni', component: Prenotazioni },
    { path: 'password/reset', component: PasswordReset },
    { path: 'password/update', component: PasswordUpdate }
];
