import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/authservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]], 
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login( username, password ).subscribe(
        (response: any) => {
          if (response && response.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (response && response.role === 'user') {
            this.router.navigate(['/home-page']);
          }
        },
        (error:any) => {
          console.error('Login failed', error);
          alert('Login failed: ' + error.message);
        }
      );
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
