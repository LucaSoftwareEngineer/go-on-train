import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-prenotazioni',
  imports: [Navbar, Sidebar],
  templateUrl: './prenotazioni.html',
  styleUrl: './prenotazioni.scss',
})
export class Prenotazioni {

}
