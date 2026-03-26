import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  ruoli = signal<Array<string>>([]);
  
  constructor() {

    this.ruoli.set(["AMMINISTRATORE", "UTENTE"]);

  }

}
