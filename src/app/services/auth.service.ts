import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  constructor(private router: Router) {}

  // login(email: string, password: string) {
  //   this.fireauth.signInWithEmailAndPassword(email, password).then(
  //     () => {
  //       this.isAuthenticated = true;
  //       localStorage.setItem('token', 'true');
  //       this.router.navigate(['/orders-list']);
  //     },
  //     (err) => {
  //       this.isAuthenticated = false;
  //       alert('Something went wrong');
  //       this.router.navigate(['/login']);
  //     }
  //   );
  // }
  // logout() {
  //   this.fireauth.signOut().then(
  //     () => {
  //       this.isAuthenticated = false;
  //       localStorage.removeItem('token');
  //       this.router.navigate(['/login']);
  //     },
  //     (err) => {
  //       alert('Something went wrong');
  //     }
  //   );
  // }
}
