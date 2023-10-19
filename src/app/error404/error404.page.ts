import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page {

  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['/login']); // Reemplaza 'login' con la ruta real de tu página de inicio de sesión
  }
}