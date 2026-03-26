import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { LoginRequest } from '../../models/LoginRequest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  email = signal<string>('');
  password = signal<string>('');

  private auth = inject(Auth);
  private toastr = inject(ToastrService);

  loginHandler() {

    let numAvvisi = 0;
    let strAvvisi = '';

    const req: LoginRequest = {
      email: this.email(),
      password: this.password()
    };

    if (this.email() === '') {
      strAvvisi += 'Inserire email... <br>'
      numAvvisi++;
    }

    if (this.password() === '') {
      strAvvisi += 'Inserire password... <br>'
      numAvvisi++;
    }

    if (numAvvisi === 0) {
      this.auth.login(req).subscribe(
        (res) => {
          console.log(res.token)
          if (res.token.length > 0) {
            this.toastr.success('Accesso effettuato...', 'Successo!');
          } else {
            this.toastr.warning('Username o password errati', 'Attenzione!');
          }
        },
        (err) => {
          this.toastr.warning('Username o password errati', 'Attenzione!');
        }
      );
    } else {
      this.toastr.warning(strAvvisi, 'Attenzione!', {enableHtml: true});
    }
  }

}
