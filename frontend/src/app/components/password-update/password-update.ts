import { Component, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PasswordResetService } from '../../services/password-reset';
import { Router, RouterLink } from '@angular/router';
import { PasswordUpdateRequest } from '../../models/PasswordUpdateRequest';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-update',
  imports: [RouterLink, FormsModule],
  templateUrl: './password-update.html',
  styleUrl: './password-update.scss',
})
export class PasswordUpdate {

  email = signal('');
  emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  password = signal('');
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  confirmPassword = signal('');
  opt = signal('');

  avvisi = signal('');
  avvisoPasswordSicura = signal(
    new String()
      .concat('La password deve contentere: <br>')
      .concat('&nbsp; 1 carattere maiuscolo... <br>')
      .concat('&nbsp; 1 carattere minuscolo... <br>')
      .concat('&nbsp; 1 carattere speciale... <br>')
      .concat('&nbsp; 1 numero... <br>')
      .concat('&nbsp; almeno 8 caratteri... <br>')
  );

  passwordResetService = inject(PasswordResetService);
  toastr = inject(ToastrService);
  router = inject(Router);

  updateHandler() {

    let nErr = 0;

    if (this.email() == "") {
      this.avvisi.update(avviso => avviso.concat('Inserisci un indirizzo email... <br>'));
      nErr++;
    }

    if (!this.emailRegex.test(this.email()) && this.email() != "") {
      this.avvisi.update(avviso => avviso.concat('Inserisci un indirizzo email valido... <br>'));
      nErr++;
    }

    if (this.password() == "") {
      this.avvisi.update(avviso => avviso.concat('Inserisci la password... <br>'));
      nErr++;
    }

    if (!this.passwordRegex.test(this.password()) && this.password() != "") {
      this.avvisi.update(avviso => avviso.concat(this.avvisoPasswordSicura()));
      nErr++;
    }

    if (this.confirmPassword() == "") {
      this.avvisi.update(avviso => avviso.concat('Conferma la password... <br>'));
      nErr++;
    }

    if (this.password() != this.confirmPassword()) {
      this.avvisi.update(avviso => avviso.concat('La password non coincide... <br>'));
      nErr++;
    }

    if (this.opt() == "") {
      this.avvisi.update(avviso => avviso.concat('Il codice OPT non è valido...'))
      nErr++;
    }

    if (nErr == 0) {
      const json: PasswordUpdateRequest = {
        email: this.email(),
        optResetPassword: this.opt(),
        rawPassword: this.password()
      };
      this.passwordResetService.update(json).subscribe(
        (res) => {
          this.toastr.success("Password modificata correttamente", "Successo!");
        },
        (error) => {
          this.toastr.warning(
            "Il codice OPT non è valido...",
            "Attenzione!",
          );
        },
      );
    } else {
      this.toastr.warning(this.avvisi(), 'Attenzione!', {enableHtml: true});
    }
    this.avvisi.set('');
  }

}
