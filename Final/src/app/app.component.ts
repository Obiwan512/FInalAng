import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './tamplate/navbar/navbar.component';
import { LoginComponent } from './tamplate/login/login.component';
import { RegistrationComponent } from './tamplate/registration/registration.component';
import { HomePageComponent } from './tamplate/home-page/home-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private router: Router) {
    this.router.config = [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'home', component: HomePageComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ];
  }
}