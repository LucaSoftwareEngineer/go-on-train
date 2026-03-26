import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-corse',
  imports: [Navbar, Sidebar],
  templateUrl: './corse.html',
  styleUrl: './corse.scss',
})
export class Corse {

}
