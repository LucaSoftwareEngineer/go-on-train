import { Component, inject, signal } from '@angular/core';
import { PasswordResetService } from '../../services/password-reset';
import { PasswordResetRequest } from '../../models/PasswordResetRequest';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  imports: [RouterLink, FormsModule],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.scss',
})
export class PasswordReset {

  email = signal('');
  passwordResetService = inject(PasswordResetService);
  toastr = inject(ToastrService);

  resetHandler() {
    const json: PasswordResetRequest = {
      email: this.email(),
    };
    this.passwordResetService.reset(json).subscribe(
      (res) => {
        this.toastr.success(
          "Richiesta di recupero password ricevuta, a breve riceverai una mail con le istruzioni",
          "Successo!",
        );
      },
      (error) => {
        this.toastr.warning(
          "L'indirizzo mail inserito non è valido...",
          "Attenzione!",
        );
      },
    );
  }

}
