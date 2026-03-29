import { Component, inject, OnInit, signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { Corsa } from '../../services/corsa';
import { CorsaResponse } from '../../models/CorsaResponse';
import { FiltroCorsePipe } from '../../pipes/filtro-corse-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-corse',
  imports: [Navbar, Sidebar, FiltroCorsePipe, FormsModule],
  templateUrl: './corse.html',
  styleUrl: './corse.scss',
})
export class Corse implements OnInit {

  elencoCorse = signal<CorsaResponse[]>([]);
  corsa = inject(Corsa);

  destinazione = '';

  ngOnInit(): void {
    this.corsa.elencoCorse().subscribe(res => {
      this.elencoCorse.update(corse => [...corse, ...res]);
    })
  }

}
