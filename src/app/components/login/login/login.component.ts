import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  login() {
    if (this.email == '') {
      alert('Wprowadź swój login');
      return;
    }

    if (this.password == '') {
      alert('Wprowadź swoje hasło');
      return;
    }

    // this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
