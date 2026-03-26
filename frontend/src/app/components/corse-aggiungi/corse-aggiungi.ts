import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-corse-aggiungi',
  imports: [Navbar, Sidebar],
  templateUrl: './corse-aggiungi.html',
  styleUrl: './corse-aggiungi.scss',
})
export class CorseAggiungi {

}
