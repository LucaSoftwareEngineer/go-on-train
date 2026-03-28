import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal, Signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Auth } from "../../services/auth";
import { RegisterRequest } from "../../models/RegisterRequest";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./register.html",
  styleUrl: "./register.scss",
})
export class Register {
  nome = signal('');
  cognome = signal('');
  email = signal('');
  emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  password = signal('');
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  confirmPassword = signal('');
  dataNascita = signal('');
  luogoNascita = signal('');
  acceptGdprAndPrivacy: boolean = false;
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

  auth = inject(Auth);
  toastr = inject(ToastrService);
  router = inject(Router);

  setAcceptGdprAndPrivacy() {
    this.acceptGdprAndPrivacy = !this.acceptGdprAndPrivacy;
  }

  registerHandler() {
    let nErr = 0;

    if (this.nome() == "") {
      this.avvisi.update(avviso => avviso.concat('Inserisci il nome... <br>'));
      nErr++;
    }

    if (this.cognome() == "") {
      this.avvisi.update(avviso => avviso.concat('Inserisci il cognome... <br>'));
      nErr++;
    }

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

    if (this.dataNascita() == "") {
      this.avvisi.update(avviso => avviso.concat('Inserisci la data di nascita.... <br>'));
      nErr++;
    }

    if (this.luogoNascita() == "") {
      this.avvisi.update(avviso => avviso.concat('Inserisci il luogo di nascita.... <br>'));
      nErr++;
    }

    if (this.acceptGdprAndPrivacy == false) {
      this.avvisi.update(avviso => avviso.concat('Accetta il GDPR... <br>'));
      nErr++;
    }

    if (nErr == 0) {
      this.auth
        .register(
          {
            nome: this.nome(),
            cognome: this.cognome(),
            email: this.email(),
            password: this.password(),
            dataNascita: this.dataNascita(),
            luogoNascita: this.luogoNascita()
          }
        )
        .subscribe(
          (json) => {
            if (json.id != null && json.id != undefined) {
              this.toastr.success(
                "Ora puoi accedere alla tua dashboard",
                "Successo!",
              );
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
            }
          },
          (err) => {
            this.toastr.warning(
              "La mail è già stata utilizzata",
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
