import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAuthenticated: boolean = false; 
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthStatus();
  }

 
  checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token; 
  }

 
  logout(): void {
    localStorage.removeItem('token'); 
    this.isAuthenticated = false; 
    this.router.navigate(['/login']); 
  }
}
