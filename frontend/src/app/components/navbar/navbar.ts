import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import SecureLS from 'secure-ls';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  ls = new SecureLS();
  private router = inject(Router);
  private toastr = inject(ToastrService);

  logoutHandler() {

    this.ls.remove('token');
    this.toastr.success('Logout effettuato...', 'Successo!')

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000)

  }

}
