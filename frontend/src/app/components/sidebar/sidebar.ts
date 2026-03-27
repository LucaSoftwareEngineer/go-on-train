import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import SecureLS from 'secure-ls';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  ruoli = signal<Array<string>>([]);
  ls = new SecureLS();
  
  constructor() {

    this.ruoli.set([this.ls.get('ruolo')]);

  }

}
