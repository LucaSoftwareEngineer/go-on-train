import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { Corsa } from '../../services/corsa';
import { RegistraCorsaRequest } from '../../models/RegistraCorsaRequest';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corse-aggiungi',
  imports: [Navbar, Sidebar, CommonModule, FormsModule],
  templateUrl: './corse-aggiungi.html',
  styleUrl: './corse-aggiungi.scss',
})
export class CorseAggiungi {

  partenzaData = signal('');
  partenzaOra = signal('');
  partenzaLuogo = signal('');
  arrivoData = signal('');
  arrivoOra = signal('');
  arrivoLuogo = signal('');
  avvisi = signal('');

  private corsa = inject(Corsa);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  registraCorsaHandler() {

    let nErr = 0;

    if (this.partenzaData() === '') {
      this.avvisi.update(avviso => avviso.concat('Inserisci la data di partenza... <br>'));
      nErr++;
    }

    if (this.partenzaOra() === '') {
      this.avvisi.update(avviso => avviso.concat('Inserisci l\'ora di partenza... <br>'));
      nErr++;
    }

    if (this.partenzaLuogo() === '') {
      this.avvisi.update(avviso => avviso.concat('Inserisci il luogo di partenza... <br>'));
      nErr++;
    }

    if (this.arrivoData() === '') {
      this.avvisi.update(avviso => avviso.concat('Inserisci la data di arrivo... <br>'));
      nErr++;
    }

    if (this.arrivoOra() === '') {
      this.avvisi.update(avviso => avviso.concat('Inserisci l\'ora di arrivo... <br>'));
      nErr++;
    }

    if (this.arrivoLuogo() === '') {
      this.avvisi.update(avviso => avviso.concat('Inserisci il luogo di arrivo... <br>'));
      nErr++;
    }

    if (nErr === 0) {
      const request: RegistraCorsaRequest = {
        partenzaData: this.partenzaData(),
        partenzaOra: this.partenzaOra(),
        partenzaLuogo: this.partenzaLuogo(),
        arrivoData: this.arrivoData(),
        arrivoOra: this.arrivoOra(),
        arrivoLuogo: this.arrivoLuogo()
      };

      this.corsa.registraCorsa(request).subscribe({
        next: (res) => {
          this.toastr.success('Corsa registrata...', 'Successo!');
          setTimeout(() => {
            this.router.navigate(['/corse']);
          }, 2000);
        },
        error: (err) => {
          this.toastr.warning('Non sei autorizzato a registrare corse...', 'Attenzione!');
        }
      });
    } else {
      this.toastr.warning(this.avvisi(), 'Attenzione!', {enableHtml:true})
    }
    this.avvisi.set('');

  }

}
