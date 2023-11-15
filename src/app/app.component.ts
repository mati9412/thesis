import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    localStorage.getItem('token')
      ? (this.auth.isAuthenticated = true)
      : (this.auth.isAuthenticated = false);
  }

  title = 'thesis';

  isAuthenticated() {
    return this.auth.isAuthenticated;
  }
  logout() {
    this.auth.logout();
  }
}
